const Dashboard = () => {
    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Mosphere Dashboard
            </h1>

            <div className="animated fadeInDown">
                <p className="mb-3 text-gray-700 dark:text-gray-400">
                    Welcome to Mosphere Dashboard, designed for efficient CRUD
                    (Create, Read, Update, Delete) operations. This interface
                    provides a comprehensive view of the registered users and
                    their posts, including:
                </p>

                <ul className="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 mb-3">
                    <li>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            Post and User ID:
                        </span>{" "}
                        A unique identifier that matches the database records to
                        ensure every user have their own posts.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            Detailed Post Information:
                        </span>
                        Comprehensive details about each post, including
                        content, author, and timestamps.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            Actions:
                        </span>{" "}
                        Edit or delete posts seamlessly with Markdown features
                        and real-time updates, powered by React and written in
                        TypeScript.
                    </li>
                </ul>

                <p className="mb-3 text-gray-700 dark:text-gray-400">
                    Built on a robust back-end using Laravel, this full-stack
                    solution ensures security and data consistency, making it
                    both user-friendly and scalable.
                </p>

                <p className="mb-3 text-gray-700 dark:text-gray-400">
                    Get started by navigating to the Posts page to view, add,
                    edit, or delete posts. To update user information, click on
                    the name above. If you need to delete your post, click on
                    the Delete button.
                </p>

                <p className="mb-3 text-gray-700 dark:text-gray-400">
                    Experience speed, reliability, and precision in managing
                    post data. This project showcases my skills in full-stack
                    development with a focus on creating high-performance
                    applications ready for real-world deployment.
                </p>
            </div>
        </>
    );
};

export default Dashboard;
