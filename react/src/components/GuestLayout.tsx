import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const GuestLayout: React.FC = () => {
    const { token } = useStateContext();
    // debugger;
    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Welcome, Guest!</h1>

            {/* renders the child routes */}
            <Outlet />
        </div>
    );
};

export default GuestLayout;
