import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const AdminRoute: React.FC = () => {
    const { user } = useStateContext();

    if (!user || !user.is_admin) {
        return <Navigate to="/posts" />;
    }

    return <Outlet />;
};

export default AdminRoute;
