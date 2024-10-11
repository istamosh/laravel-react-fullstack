import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const UserOrAdminRoute: React.FC = () => {
    const { user } = useStateContext();
    const { id } = useParams<{ id: string }>();

    if (!user || (!user.is_admin && user.id !== Number(id))) {
        return <Navigate to="/posts" />;
    }

    return <Outlet />;
};

export default UserOrAdminRoute;
