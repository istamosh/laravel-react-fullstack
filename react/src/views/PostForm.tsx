import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Button, Textarea, TextInput } from "flowbite-react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

interface Post {
    id: number | null;
    title: string;
    content: string;
    user_id: number | null;
    user_name: string;
    admin_touched: boolean;
    created_at: string;
    updated_at: string;
}

const PostForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [markdownInput, setMarkdownInput] = useState<string>("");

    const { user, setNotification } = useStateContext();

    const [post, setPost] = useState<Post>({
        id: null,
        title: "",
        content: "",
        user_id: null,
        user_name: "",
        admin_touched: false,
        created_at: "",
        updated_at: "",
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/posts/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setPost(data);
                    setMarkdownInput(data.content);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (post.id) {
            axiosClient
                .put(`/posts/${post.id}`, post)
                .then(() => {
                    setNotification("Post updated successfully.");

                    navigate("/posts");
                })
                .catch((err) => {
                    const response = err.response;
                    console.log(response);
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    } else {
                        setNotification(
                            response.statusText + ": " + response.data.error
                        );
                    }

                    navigate("/posts");
                });
        } else {
            axiosClient
                .post(`/posts`, post)
                .then(() => {
                    setNotification("Post created successfully.");
                    navigate("/posts");
                })
                .catch((err) => {
                    console.error("Error:", err);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownInput(e.target.value);
        setPost({ ...post, content: e.target.value });
    };

    return (
        <>
            <h3 className="text-3xl font-bold dark:text-white mb-3">
                {id
                    ? user.id !== post.user_id && !user.is_admin
                        ? `${post.title}`
                        : "Edit Post"
                    : "Create New Post"}
            </h3>

            {!loading && (
                <div className="animated fadeInDown">
                    {user.id === post.user_id || user.is_admin ? (
                        <>
                            <form
                                action=""
                                className="flex flex-col gap-4"
                                onSubmit={onSubmit}
                            >
                                {errors && (
                                    <div className="alert">
                                        {Object.keys(errors).map((key) => (
                                            <p key={key}>{errors[key][0]}</p>
                                        ))}
                                    </div>
                                )}

                                <TextInput
                                    id="title"
                                    type="text"
                                    placeholder={id ? post.title : "Title"}
                                    required
                                    value={post.title}
                                    onChange={(e) =>
                                        setPost({
                                            ...post,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <Textarea
                                    id="post"
                                    placeholder={
                                        id
                                            ? post.content
                                            : "You can use Markdown here..."
                                    }
                                    required
                                    rows={4}
                                    value={markdownInput}
                                    onChange={handleInputChange}
                                />
                                <button>
                                    <Button as="div" color="blue">
                                        {post && post.id
                                            ? "Update Post"
                                            : "Post!"}
                                    </Button>
                                </button>
                            </form>

                            <div>
                                <h3 className="text-lg dark:text-white">
                                    Preview:
                                </h3>
                                <ReactMarkdown className="prose lg:prose-xl dark:prose-invert">
                                    {markdownInput}
                                </ReactMarkdown>
                            </div>

                            <div className="dark:text-white">
                                <p>
                                    Author: {post.user_name} ({post.user_id})
                                    {post.admin_touched ? ", admin" : ""}.
                                </p>
                                <p>Created At: {post.created_at}</p>
                                <p>Updated At: {post.updated_at}</p>
                                <p>Post ID: {post.id}</p>
                            </div>
                        </>
                    ) : (
                        <ReactMarkdown className="prose lg:prose-xl dark:prose-invert">
                            {markdownInput}
                        </ReactMarkdown>
                    )}
                </div>
            )}
        </>
    );
};

export default PostForm;
