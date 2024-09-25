// handles page routing

import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import Posts from "./views/Posts";
import PostForm from "./views/PostForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                // redirects to /users instead
                element: <Navigate to="/users" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            // create route for new user and update route for existing
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
            {
                path: "/posts",
                element: <Posts />,
            },
            {
                path: "/posts/new",
                element: <PostForm key="postCreate" />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },

    // when it's not found
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
