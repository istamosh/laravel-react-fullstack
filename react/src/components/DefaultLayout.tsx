import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const DefaultLayout: React.FC = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Outlet />
            <p>Using Default Layout.</p>
        </div>
    );
};

export default DefaultLayout;
