import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Button, TextInput } from "flowbite-react";

interface User {
    id: number | null;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const UserForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    // alias setUser to setContextUser to prevent confusion
    const {
        user: contextUser,
        setUser: setContextUser,
        setNotification,
        refreshUser,
    } = useStateContext();
    const [user, setUser] = useState<User>({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(({ data }) => {
                    setNotification("User updated successfully.");

                    // display the updated user context for current logged in user
                    if (data.id === contextUser.id) {
                        setContextUser(data);
                    }

                    // Trigger re-fetching of user data
                    refreshUser();

                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users`, user)
                .then(() => {
                    setNotification("User created successfully.");

                    // redirect to users page
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            <h3 className="text-3xl font-bold dark:text-white mb-3">
                {loading
                    ? "Loading..."
                    : user.id
                    ? `Update User: ${user.name}`
                    : "Create New User"}
            </h3>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    <div className="animated fadeInDown">
                        {errors && (
                            <div className="alert">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}

                        <form
                            action=""
                            className="flex flex-col gap-4"
                            onSubmit={onSubmit}
                        >
                            <TextInput
                                type="text"
                                onChange={(e) =>
                                    setUser({ ...user, name: e.target.value })
                                }
                                value={user.name}
                                placeholder="John Doe"
                            />
                            <TextInput
                                type="email"
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                                value={user.email}
                                placeholder="Email"
                            />
                            <TextInput
                                type="password"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                            <TextInput
                                type="password"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password_confirmation: e.target.value,
                                    })
                                }
                                placeholder="Retype Password"
                            />
                            <Button type="submit" color="blue">
                                Save
                            </Button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default UserForm;
