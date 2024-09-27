import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const Register = () => {
    const nameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordConfirmationRef = useRef<HTMLInputElement>();

    const [errors, setErrors] = useState(null);
    // when you press CTRL+SPACE the state context will show
    // from ContextProvider
    const { setUser, setToken } = useStateContext();

    // useEffect(() => {
    //     debugger;
    // }, [errors]);

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
            <form
                onSubmit={onSubmit}
                className="flex max-w-md flex-col mx-auto"
            >
                <h1 className="text-2xl font-bold dark:text-white text-center">
                    Register
                </h1>

                {/* display errors */}
                {errors && (
                    <Alert
                        color="failure"
                        icon={HiInformationCircle}
                        className="my-2 py-1"
                    >
                        <div className="flex flex-col">
                            {Object.keys(errors).map((key) => (
                                <span key={key}>{errors[key][0]}</span>
                            ))}
                        </div>
                    </Alert>
                )}

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="text" value="Your name" />
                    </div>
                    <TextInput
                        ref={nameRef as React.RefObject<HTMLInputElement>}
                        id="text"
                        type="text"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                        ref={emailRef as React.RefObject<HTMLInputElement>}
                        id="email"
                        type="email"
                        placeholder="john@doe.com"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput
                        ref={passwordRef as React.RefObject<HTMLInputElement>}
                        id="password"
                        type="password"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password_confirmation"
                            value="Re-type password"
                        />
                    </div>
                    <TextInput
                        ref={
                            passwordConfirmationRef as React.RefObject<HTMLInputElement>
                        }
                        id="password_confirmation"
                        type="password"
                        required
                    />
                </div>
                <Button type="submit">Register</Button>
            </form>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Already registered?
                <Link
                    to="/login"
                    className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                    Login here
                </Link>
                .
            </p>
        </>
    );
};

export default Register;
