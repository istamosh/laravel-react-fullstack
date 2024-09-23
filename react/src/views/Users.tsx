import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Pagination } from "flowbite-react";

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // get the currently logged in user and notification component
    const { user: contextUser, setNotification } = useStateContext();

    // componentDidMount
    useEffect(() => {
        // getUsers() gets called twice because of React.StrictMode
        getUsers(currentPage);
    }, [currentPage]);

    const getUsers = (page: number) => {
        setLoading(true);
        axiosClient
            .get(`/users?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setUsers(data.data);

                setTotalPages(data.meta.last_page);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const onDelete = (user: User) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            setNotification(`User ${user.name} deleted successfully.`);

            // display the users back
            getUsers(currentPage);
        });
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users Page</h1>
                <Link to="/users/new" className="btn-add">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Joined Since</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan={5} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link
                                            to={`/users/${user.id}`}
                                            className="btn-edit"
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        {contextUser &&
                                            "id" in contextUser &&
                                            contextUser.id !== user.id && (
                                                <button
                                                    onClick={() =>
                                                        onDelete(user)
                                                    }
                                                    className="btn-delete"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                {!loading && (
                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Users;
