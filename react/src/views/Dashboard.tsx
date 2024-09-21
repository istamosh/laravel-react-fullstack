const Dashboard = () => {
    return (
        <>
            <h1 className="text-center">User Management Dashboard</h1>

            <p>
                Welcome to the User Management Dashboard, designed for efficient
                CRUD (Create, Read, Update, Delete) operations. This interface
                provides a comprehensive view of the registered users,
                including:
            </p>

            <ul>
                <li>
                    User ID: A unique identifier that matches the database
                    records.
                </li>
                <li>Name & Email: Easily accessible details for each user.</li>
                <li>
                    Actions: Edit or delete users seamlessly with real-time
                    updates powered by React and TypeScript.
                </li>
            </ul>

            <p>
                Built on a robust back-end using Laravel, this full-stack
                solution ensures security and data consistency. The intuitive
                front-end leverages modern JavaScript libraries for smooth,
                dynamic interactions, making it both user-friendly and scalable.
                Whether you're managing a small team or a large user base, this
                dashboard adapts to your needs.
            </p>

            <p>
                Get started by navigating to the Users page to view, add, edit,
                or delete users. To update user information, click on the Edit
                button. If you need to remove a user, click on the Delete
                button.
            </p>

            <p>
                Experience speed, reliability, and precision in managing user
                data. This project showcases my skills in full-stack development
                with a focus on creating high-performance applications ready for
                real-world deployment.
            </p>
        </>
    );
};

export default Dashboard;
