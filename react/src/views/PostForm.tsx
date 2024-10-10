import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Button, Textarea, TextInput } from "flowbite-react";
import axiosClient from "../axios-client";

interface Post {
    id: number | null;
    title: string;
    content: string;
}

const PostForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [markdownInput, setMarkdownInput] = useState<string>("");
    const [post, setPost] = useState<Post>({
        id: null,
        title: "",
        content: "",
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/posts/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setPost(data);
                    console.log("Fetched post data:", data);
                    setMarkdownInput(data.content);
                })
                .catch((err) => {
                    setLoading(false);
                    console.error("Error:", err);
                });
        }
    }, [id]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (post.id) {
            axiosClient
                .put(`/posts/${post.id}`, post)
                .then(() => {
                    navigate("/posts");
                })
                .catch((err) => {
                    console.error("Error:", err);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/posts`, post)
                .then(() => {
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
                {id ? "Edit Post" : "Create New Post"}
            </h3>

            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        <TextInput
                            id="title"
                            type="text"
                            placeholder={id ? post.title : "Title"}
                            required
                            value={post.title}
                            onChange={(e) =>
                                setPost({ ...post, title: e.target.value })
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
                        <Button color="blue">Post!</Button>
                    </form>

                    <div>
                        <h3 className="text-lg dark:text-white">Preview:</h3>
                        <ReactMarkdown className="prose lg:prose-xl dark:prose-invert">
                            {markdownInput}
                        </ReactMarkdown>
                    </div>
                </>
            )}
        </>
    );
};

export default PostForm;
