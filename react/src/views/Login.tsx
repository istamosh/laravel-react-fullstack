import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

interface Errors {
    // flexible props and its string type defining the string array
    [key: string]: string[];
}

const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const [errors, setErrors] = useState<Errors | null>(null);
    // when you press CTRL+SPACE the state context will show
    // from ContextProvider
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current ? emailRef.current.value : "",
            password: passwordRef.current ? passwordRef.current.value : "",
        };

        // clearing the error message first before showing another one
        setErrors(null);

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
                    response.data.errors
                        ? setErrors(response.data.errors)
                        : setErrors({
                              email: [response.data.message],
                          });
                }
            });
    };

    return (
        <>
            <form
                onSubmit={onSubmit}
                className="flex max-w-md flex-col gap-4 mx-auto"
            >
                <h1 className="text-2xl font-bold dark:text-white text-center">
                    Login
                </h1>

                {errors && (
                    <Alert color="failure" icon={HiInformationCircle}>
                        <div className="flex flex-col">
                            {Object.keys(errors).map((key) => (
                                <span key={key}>{errors[key][0]}</span>
                            ))}
                        </div>
                    </Alert>
                )}

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
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput
                        ref={passwordRef as React.RefObject<HTMLInputElement>}
                        id="password"
                        type="password"
                        required
                    />
                </div>
                <Button type="submit">Login</Button>
            </form>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Not registered?
                <Link
                    to="/register"
                    className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                    Create an account
                </Link>
                .
            </p>
        </>
    );
};

export default Login;
