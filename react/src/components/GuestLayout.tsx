import React from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";

const GuestLayout: React.FC = () => {
    const { token } = useStateContext();
    const location = useLocation();

    // if user is already logged in, redirect to home page
    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-900">
                <Navbar fluid rounded className="mb-3">
                    <Link to="/login">
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Welcome, Guest!
                        </span>
                    </Link>
                    <div className="flex md:order-2">
                        {location.pathname !== "/guestposts" && (
                            <Link to="/guestposts">
                                <Button>Posts</Button>
                            </Link>
                        )}
                        <Flowbite>
                            <DarkThemeToggle className="ml-3" />
                        </Flowbite>
                    </div>
                </Navbar>
                <div className="animated fadeInDown px-4 py-2">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default GuestLayout;
