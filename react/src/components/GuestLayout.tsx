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
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default GuestLayout;
