import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";

const GuestLayout: React.FC = () => {
    const { token } = useStateContext();

    // if user is already logged in, redirect to home page
    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-900">
                <Navbar fluid rounded className="mb-3">
                    <Navbar.Brand href="https://flowbite-react.com">
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Welcome, Guest!
                        </span>
                    </Navbar.Brand>
                    <div className="flex md:order-2">
                        <Button>Get started</Button>
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
