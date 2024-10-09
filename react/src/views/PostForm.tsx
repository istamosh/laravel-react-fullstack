import React from "react";
// import { Button, Textarea, TextInput } from "flowbite-react";
// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useParams } from "react-router-dom";
// import axiosClient from "../axios-client";

// interface Post {
//     id: number | null;
//     title: string;
//     content: string;
// }

// const PostForm: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const [loading, setLoading] = useState(false);
//     const [markdownInput, setMarkdownInput] = useState<string>("");
//     const [post, setPost] = useState<Post>({
//         id: null,
//         title: "",
//         content: "",
//     });

//     useEffect(() => {
//         if (id) {
//             setLoading(true);
//             axiosClient
//                 .get(`/posts/${id}`)
//                 .then(({ data }) => {
//                     setLoading(false);
//                     setPost(data);
//                     console.log(data);
//                     setMarkdownInput(data.content);
//                 })
//                 .catch((err) => {
//                     setLoading(false);
//                     console.error('Error:', err);
//                 });
//         }
//     }, [id]);

//     const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         //TODO: check if edited post has id, operate axiosClient put here
//         if (post.id) {
//             axiosClient
//                 .put(`/posts/${post.id}`, post)
//                 .then(({ data }) => {
//                     console.log(data);
//                 })
//                 .catch((err) => {
//                     console.error('Error:', err);
//                 });
//         }
//         else {
//             axiosClient
//                 .post(`/posts`, post)
//                 .then(({ data }) => {
//                     console.log(data);
//                 })
//                 .catch((err) => {
//                     console.error('Error:', err);
//                 });
//         }
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setMarkdownInput(e.target.value);
//         setPost({ ...post, content: e.target.value });
//     };

//     return (
//         <>
//             <h3 className="text-3xl font-bold dark:text-white mb-3">
//                 {id ? "Edit Post" : "Create New Post"}
//             </h3>

//             <form className="flex flex-col gap-4" onSubmit={onSubmit}>
//                 <TextInput
//                     id="title"
//                     type="text"
//                     placeholder={id ? post.title : "Title"}
//                     required
//                     value={post.title}
//                     onChange={(e) => setPost({ ...post, title: e.target.value })}
//                 />
//                 <Textarea
//                     id="post"
//                     placeholder={id ? post.content : "You can use Markdown here..."}
//                     required
//                     rows={4}
//                     value={markdownInput}
//                     onChange={handleInputChange}
//                 />
//                 <Button color="blue">Post!</Button>
//             </form>

//             <div>
//                 <h3 className="text-lg dark:text-white">Preview:</h3>
//                 <ReactMarkdown className="prose lg:prose-xl dark:prose-invert">
//                     {markdownInput}
//                 </ReactMarkdown>
//             </div>
//         </>
//     );
// };

const PostForm: React.FC = () => {
    return (
        <>
            <h1>PostForm</h1>
        </>
    );
}

export default PostForm;
