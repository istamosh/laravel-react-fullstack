import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Button, Pagination, Table } from "flowbite-react";

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
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold dark:text-white">
                    User List
                </h3>
                <Button color="blue">
                    <Link to="/users/new">Add New</Link>
                </Button>
            </div>
            <div className="card animated fadeInDown bg-gray-100 dark:bg-gray-900">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Joined Since</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {loading ? (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell
                                    colSpan={5}
                                    className="text-center whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                >
                                    Loading...
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            users.map((user) => (
                                <Table.Row
                                    key={user.id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user.id}
                                    </Table.Cell>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.created_at}</Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            to={`/users/${user.id}`}
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4"
                                        >
                                            Edit
                                        </Link>
                                        {contextUser &&
                                            "id" in contextUser &&
                                            contextUser.id !== user.id && (
                                                <Link
                                                    to="#"
                                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                    onClick={() =>
                                                        onDelete(user)
                                                    }
                                                >
                                                    Delete
                                                </Link>
                                            )}
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
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
