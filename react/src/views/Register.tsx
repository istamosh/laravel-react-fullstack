import React from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <h1 className="title">Register new account</h1>
                <input type="name" placeholder="Full Name" />
                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Retype Password" />
                <button className="btn btn-block">Register</button>
                <p className="message">
                    Already registered? <Link to="/login">Login here.</Link>
                </p>
            </form>
        </>
    );
};

export default Register;
