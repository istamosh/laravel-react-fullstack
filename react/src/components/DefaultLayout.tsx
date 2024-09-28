import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { DarkThemeToggle, Flowbite, Sidebar } from "flowbite-react";
import { HiDocumentDuplicate, HiUsers, HiViewBoards } from "react-icons/hi";

const DefaultLayout: React.FC = () => {
    const { user, token, notification, setUser, setToken, refreshUser } =
        useStateContext();

    // add useEffect that using axiosClient to get user data
    // then dispatch setUser
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

    return (
        <Flowbite>
            <div id="defaultLayout">
                <aside className="bg-gray-100 dark:bg-gray-900">
                    <Sidebar aria-label="Default sidebar example">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                {user && user.is_admin ? (
                                    <Link to="/users">
                                        <Sidebar.Item icon={HiUsers}>
                                            Users
                                        </Sidebar.Item>
                                    </Link>
                                ) : null}
                                <Link to="/dashboard">
                                    <Sidebar.Item icon={HiViewBoards}>
                                        Dashboard
                                    </Sidebar.Item>
                                </Link>
                                <Link to="/posts">
                                    <Sidebar.Item icon={HiDocumentDuplicate}>
                                        Posts
                                    </Sidebar.Item>
                                </Link>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </aside>

                <div className="content bg-gray-100 dark:bg-gray-900">
                    {notification && (
                        <div className="notification">{notification}</div>
                    )}

                    <header className="justify-end bg-gray-100 dark:bg-gray-800">
                        <div className="text-gray-900 dark:text-white">
                            <span className="font-semibold">{user.name}</span>
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
