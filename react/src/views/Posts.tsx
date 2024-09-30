import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

interface Post {
    id: number;
    title: string;
    content: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // check if user is authenticated
    const { token } = useStateContext();

    // define axiosClient for fetching posts

    // fetch posts/pagination
    const getPosts = (page: number) => {
        setLoading(true);
        axiosClient
            .get(`/posts?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setPosts(data.data);
                setTotalPages(data.meta.last_page);
            })
            .catch(() => {
                setLoading(false);
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

            <div className="animated fadeInDown grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <Card key={post.id} href="#" className="max-w-sm">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {post.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {post.content}
                        </p>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Posts;
