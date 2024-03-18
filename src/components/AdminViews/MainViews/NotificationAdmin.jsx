import { useState } from "react";
import Notification from "../Notification";

const NotificationView = ({ notifications }) => {
    const logs = [
        { time: "2024-03-05 10:00:00", content: "User logged in." },
        { time: "2024-03-05 10:05:23", content: "Clicked on the homepage." },
        { time: "2024-03-05 10:10:45", content: "Added item to cart." },
        { time: "2024-03-05 10:15:12", content: "Submitted order." },
        { time: "2024-03-05 10:20:34", content: "Logged out." },
    ];

    return (
        <div className="p-4 sm:ml-64">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Logs</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600"></p>
                <hr />
            </div>

            <hr />
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-10">
                {logs.map((log, index) => (
                    <pre key={index}>
                        <code>
                            {log.time} - {log.content}
                        </code>
                    </pre>
                ))}
            </div>
        </div>
    );
};

export default NotificationView;
