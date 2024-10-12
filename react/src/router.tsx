import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Login = lazy(() => import("./views/Login"));
const Register = lazy(() => import("./views/Register"));
const Users = lazy(() => import("./views/Users"));
const NotFound = lazy(() => import("./views/NotFound"));
const DefaultLayout = lazy(() => import("./components/DefaultLayout"));
const GuestLayout = lazy(() => import("./components/GuestLayout"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const UserForm = lazy(() => import("./views/UserForm"));
const Posts = lazy(() => import("./views/Posts"));
const PostForm = lazy(() => import("./views/PostForm"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));
const UserOrAdminRoute = lazy(() => import("./components/UserOrAdminRoute"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <DefaultLayout />
            </Suspense>
        ),
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/dashboard",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: "/users",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminRoute />
                    </Suspense>
                ),
                children: [
                    {
                        path: "",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <Users />
                            </Suspense>
                        ),
                    },
                    {
                        path: "new",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <UserForm key="userCreate" />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "/users/:id",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserOrAdminRoute />
                    </Suspense>
                ),
                children: [
                    {
                        path: "",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <UserForm key="userUpdate" />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "/posts",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Posts />
                    </Suspense>
                ),
            },
            {
                path: "/posts/new",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostForm key="postCreate" />
                    </Suspense>
                ),
            },
            {
                path: "/posts/:id",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostForm key="postUpdate" />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <GuestLayout />
            </Suspense>
        ),
        children: [
            {
                path: "/login",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "/register",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: "/guestposts",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Posts />
                    </Suspense>
                ),
            },
            {
                path: "/guestposts/:id",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostForm />
                    </Suspense>
                ),
            },
        ],
    },

    // when it's not found
    {
        path: "*",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
            </Suspense>
        ),
    },
]);

export default router;
