import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

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
    const { setUser: setContextUser, setNotification } = useStateContext();
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
                    setContextUser(data);

                    // redirect to users page
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
            {user.id ? (
                <h1>Update User: {user.name}</h1>
            ) : (
                <h1>Create New User</h1>
            )}

            <div className="card animated fadeInDown">
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form action="" onSubmit={onSubmit}>
                        <input
                            type="text"
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                            value={user.name}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            value={user.email}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                            placeholder="Retype Password"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default UserForm;
