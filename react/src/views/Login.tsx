import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const [errors, setErrors] = useState(null);
    // when you press CTRL+SPACE the state context will show
    // from ContextProvider
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current ? emailRef.current.value : "",
            password: passwordRef.current ? passwordRef.current.value : "",
        };

        console.log(payload);
        // get { data } response from AuthController
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <h1 className="title">Login into your account</h1>
                {/* display errors */}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <input
                    ref={emailRef as React.RefObject<HTMLInputElement>}
                    type="email"
                    placeholder="Email"
                />
                <input
                    ref={passwordRef as React.RefObject<HTMLInputElement>}
                    type="password"
                    placeholder="Password"
                />
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not registered?{" "}
                    <Link to="/register">Create an account</Link>
                </p>
            </form>
        </>
    );
};

export default Login;
