import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Register = () => {
    const nameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordConfirmationRef = useRef<HTMLInputElement>();

    const [errors, setErrors] = useState(null);
    // when you press CTRL+SPACE the state context will show
    // from ContextProvider
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current ? nameRef.current.value : "",
            email: emailRef.current ? emailRef.current.value : "",
            password: passwordRef.current ? passwordRef.current.value : "",
            password_confirmation: passwordConfirmationRef.current
                ? passwordConfirmationRef.current.value
                : "",
        };

        console.log(payload);
        // get { data } response from AuthController
        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <h1 className="title">Register new account</h1>

                {/* display errors */}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                <input
                    ref={nameRef as React.RefObject<HTMLInputElement>}
                    placeholder="Full Name"
                />
                <input
                    ref={emailRef as React.RefObject<HTMLInputElement>}
                    type="email"
                    placeholder="Email Address"
                />
                <input
                    ref={passwordRef as React.RefObject<HTMLInputElement>}
                    type="password"
                    placeholder="Password"
                />
                <input
                    ref={
                        passwordConfirmationRef as React.RefObject<HTMLInputElement>
                    }
                    type="password"
                    placeholder="Retype Password"
                />
                <button className="btn btn-block">Register</button>
                <p className="message">
                    Already registered? <Link to="/login">Login here.</Link>
                </p>
            </form>
        </>
    );
};

export default Register;
