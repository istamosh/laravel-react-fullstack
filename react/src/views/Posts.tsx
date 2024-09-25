import { Button, Card } from "flowbite-react";
import React from "react";

const Posts: React.FC = () => {
    // define axiosClient for fetching posts

    // placeholder card display
    const cards = [1, 2, 3, 4, 5, 6];

    return (
        <>
            <div className="flex flex-row justify-between items-start">
                <h3 className="text-3xl font-bold dark:text-white mb-3">
                    Posts Page
                </h3>
                <Button color="blue">Create Post</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cards.map((_, index) => (
                    <Card key={index} href="#" className="max-w-sm">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology
                            acquisitions of 2021 so far, in reverse
                            chronological order.
                        </p>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Posts;
