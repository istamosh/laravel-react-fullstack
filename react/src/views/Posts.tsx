import { Button, Card, Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

interface Post {
    id: number;
    title: string;
    content: string;
    user_id: number;
    user_name: string;
    admin_touched: boolean;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { user, token, setNotification } = useStateContext();

    // fetch posts on page load
    useEffect(() => {
        getPosts(currentPage);
    }, [currentPage]);

    // fetch posts/pagination
    const getPosts = (page: number) => {
        setLoading(true);
        axiosClient
            .get(token ? `/posts?page=${page}` : `/guestposts?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                setPosts(data.data);
                setTotalPages(data.meta.last_page);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const onDelete = (post: Post) => {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        axiosClient
            .delete(`/posts/${post.id}`)
            .then(() => {
                setNotification(`Post ${post.title} deleted successfully.`);

                // display the posts back
                getPosts(currentPage);
            })
            .catch((err) => {
                const response = err.response;
                // catching 403 from the backend
                if (response && response.status === 403) {
                    setNotification(
                        response.statusText + ": " + response.data.error
                    );
                } else {
                    setNotification(
                        "An error occurred while deleting the post."
                    );
                }
            });
    };

    return (
        <>
            <div className="flex flex-row justify-between items-start w-11/12 mx-auto">
                <h3 className="text-3xl font-bold dark:text-white mb-3">
                    Posts Page
                </h3>

                <Link to={token ? "/posts/new" : "/login"}>
                    <Button color="blue">Create Your Post!</Button>
                </Link>
            </div>

            {!loading && (
                <>
                    <div className="animated fadeInDown grid grid-cols-2 md:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <Card key={post.id} className="max-w-sm">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {post.title}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {post.content.replace(/#/g, "")}
                                </p>
                                <em className="text-sm text-gray-500 dark:text-gray-400 text-right">
                                    -
                                    {post.user_id === user.id
                                        ? " You"
                                        : ` ${post.user_name}`}
                                    {post.admin_touched ? (
                                        <span>
                                            ,{" "}
                                            <span className="text-sky-400">
                                                admin
                                            </span>
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </em>

                                {token ? (
                                    <div className="flex justify-end gap-x-1">
                                        <Link to={`/posts/${post.id}`}>
                                            <Button color="blue">View</Button>
                                        </Link>

                                        {/* Display delete for own post or if user is admin */}
                                        {(user.is_admin ||
                                            post.user_id === user.id) && (
                                            <Link
                                                to="#"
                                                onClick={() => onDelete(post)}
                                            >
                                                <Button color="red">
                                                    Delete
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={`/guestposts/${post.id}`}
                                        className="flex justify-end"
                                    >
                                        <Button color="blue">View</Button>
                                    </Link>
                                )}
                            </Card>
                        ))}
                    </div>
                </>
            )}

            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    showIcons
                />
            </div>
        </>
    );
};

export default Posts;
