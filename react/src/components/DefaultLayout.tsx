import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Button, DarkThemeToggle, Drawer, Flowbite } from "flowbite-react";
import {
    HiDocumentDuplicate,
    HiMenu,
    HiUsers,
    HiViewBoards,
} from "react-icons/hi";

const DefaultLayout: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { user, token, notification, setUser, setToken, refreshUser } =
        useStateContext();

    // displaying the user name in the header
    useEffect(() => {
        if (token) {
            axiosClient.get("/user").then(({ data }) => {
                setUser(data);
            });
            refreshUser();
        }
    }, [token]);

    if (!token) {
        return <Navigate to="/guestposts" />;
    }

    const onLogout = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
    ) => {
        e.preventDefault();

        // trigger backend logout request and clear the user and token
        axiosClient.post("/logout").then(() => {
            setUser({
                id: null,
                name: "",
                is_admin: false,
            });
            setToken(null);
        });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Flowbite>
            <div id="defaultLayout">
                {/* <aside className="bg-gray-100 dark:bg-gray-900"></aside> */}

                <Drawer
                    open={isOpen}
                    onClose={handleClose}
                    className="w-auto flex flex-col gap-2"
                >
                    {user && user.is_admin ? (
                        <Link to="/users">
                            <Button
                                color="gray"
                                className="w-full"
                                onClick={handleClose}
                            >
                                <HiUsers className="self-center mr-2" />
                                <span>Users</span>
                            </Button>
                        </Link>
                    ) : null}
                    <Link to="/dashboard">
                        <Button
                            color="gray"
                            className="w-full"
                            onClick={handleClose}
                        >
                            <HiViewBoards className="self-center mr-2" />
                            <span>Dashboard</span>
                        </Button>
                    </Link>
                    <Link to="/posts">
                        <Button
                            color="gray"
                            className="w-full"
                            onClick={handleClose}
                        >
                            <HiDocumentDuplicate className="self-center mr-2" />
                            <span>Posts</span>
                        </Button>
                    </Link>
                </Drawer>

                <div className="content bg-gray-100 dark:bg-gray-900">
                    {notification && (
                        <div className="notification">{notification}</div>
                    )}

                    <header className="flex bg-gray-100 dark:bg-gray-800">
                        <div className="grow">
                            <Button
                                color="gray"
                                size="lg"
                                onClick={() => setIsOpen(true)}
                            >
                                <HiMenu />
                            </Button>
                        </div>
                        <div className="text-gray-900 dark:text-white items-baseline">
                            <Link
                                to={`/users/${user.id}`}
                                className="font-semibold hover:underline"
                            >
                                {user.name}
                            </Link>
                            <a
                                href="#"
                                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 mx-3"
                                onClick={onLogout}
                            >
                                Logout
                            </a>
                            <DarkThemeToggle />
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </Flowbite>
    );
};

export default DefaultLayout;
