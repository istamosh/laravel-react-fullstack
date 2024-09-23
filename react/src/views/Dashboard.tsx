const Dashboard = () => {
    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                User Management Dashboard
            </h1>

            <p className="mb-3 text-gray-700 dark:text-gray-400">
                Welcome to the User Management Dashboard, designed for efficient
                CRUD (Create, Read, Update, Delete) operations. This interface
                provides a comprehensive view of the registered users,
                including:
            </p>

            <ul className="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 mb-3">
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        User ID:
                    </span>{" "}
                    A unique identifier that matches the database records.
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        Name & Email:
                    </span>{" "}
                    Easily accessible details for each user.
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        Actions:
                    </span>{" "}
                    Edit or delete users seamlessly with real-time updates
                    powered by React and TypeScript.
                </li>
            </ul>

            <p className="mb-3 text-gray-700 dark:text-gray-400">
                Built on a robust back-end using Laravel, this full-stack
                solution ensures security and data consistency. The intuitive
                front-end leverages modern JavaScript libraries for smooth,
                dynamic interactions, making it both user-friendly and scalable.
                Whether you're managing a small team or a large user base, this
                dashboard adapts to your needs.
            </p>

            <p className="mb-3 text-gray-700 dark:text-gray-400">
                Get started by navigating to the Users page to view, add, edit,
                or delete users. To update user information, click on the Edit
                button. If you need to remove a user, click on the Delete
                button.
            </p>

            <p className="mb-3 text-gray-700 dark:text-gray-400">
                Experience speed, reliability, and precision in managing user
                data. This project showcases my skills in full-stack development
                with a focus on creating high-performance applications ready for
                real-world deployment.
            </p>
        </>
    );
};

export default Dashboard;
