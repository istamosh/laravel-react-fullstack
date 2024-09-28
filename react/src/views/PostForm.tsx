import { Button, Textarea, TextInput } from "flowbite-react";
import React from "react";

const PostForm: React.FC = () => {
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
                    id="comment"
                    placeholder="You can use Markdown here..."
                    required
                    rows={4}
                />
                <Button type="submit">Post!</Button>
            </form>
        </>
    );
};

export default PostForm;
