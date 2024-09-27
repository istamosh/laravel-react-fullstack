import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const PostForm: React.FC = () => {
    // creating post requires authentication
    const { token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <h3 className="text-3xl font-bold dark:text-white mb-3">
            Create New Post
        </h3>
    );
};

export default PostForm;
