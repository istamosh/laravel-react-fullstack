import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const DefaultLayout: React.FC = () => {
    const { user, token, notification, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    // add useEffect that using axiosClient to get user data
    // then dispatch setUser
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    const onLogout = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
    ) => {
        e.preventDefault();

        // trigger backend logout request and clear the user and token
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                {notification && (
                    <div className="notification">{notification}</div>
                )}

                <header>
                    <h2>Management Dashboard</h2>
                    <div>
                        {user.name}
                        <a href="#" className="btn-logout" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
