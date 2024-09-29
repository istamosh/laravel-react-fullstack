import { Button, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const PostForm: React.FC = () => {
    const [markdownInput, setMarkdownInput] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownInput(e.target.value);
    };

    return (
        <>
            <h3 className="text-3xl font-bold dark:text-white mb-3">
                Create New Post
            </h3>

            <form className="flex flex-col gap-4">
                <TextInput
                    id="title"
                    type="text"
                    placeholder="Title"
                    required
                />
                <Textarea
                    id="post"
                    placeholder="You can use Markdown here..."
                    required
                    rows={4}
                    value={markdownInput}
                    onChange={handleInputChange}
                />
                <Button type="submit">Post!</Button>

                <div>
                    <h3 className="text-lg dark:text-white">Preview:</h3>
                    <ReactMarkdown className="prose lg:prose-xl dark:prose-invert">
                        {markdownInput}
                    </ReactMarkdown>
                </div>
            </form>
        </>
    );
};

export default PostForm;
