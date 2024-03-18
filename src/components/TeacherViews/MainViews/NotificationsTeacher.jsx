import { useState, useEffect } from "react";
import Notification from "../Notification";
import userService from "../../../services/userServices";
import { useSelector } from "react-redux";

const NotificationView = () => {
    const teacherId = useSelector((state) => state.user.userInfo.id);
    const [notifications, setNotifications] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [classId, setClassId] = useState("");
    const [classList, setClassList] = useState([]);
    const [result, setResult] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await userService.sendNotifi(teacherId, classId, title, content);
        if (result) alert("Create successful");
    };

    useEffect(() => {
        const loadClass = async () => {
            const classes = await userService.getClasses();
            setClassList(classes);
        };
        const loadNotification = async () => {
            const result = await userService.getNotificationOfTeacher(teacherId);
            setNotifications(result);
        };

        loadNotification();
        loadClass();
    }, [result]);

    return (
        <div className="p-4 sm:ml-64">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Notifications</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600"></p>
                <hr />
            </div>
            <div className="mx-auto max-w-2xl lg:mx-0 my-10">
                <button className="btn" onClick={() => document.getElementById("my_modal_noti").showModal()}>
                    Create new notification
                </button>
                <dialog id="my_modal_noti" className="modal">
                    <div className="modal-box">
                        <form className="py-4 flex items-center flex-col" onSubmit={handleSubmit}>
                            <h3 className="font-bold text-xl mb-3">Create new notification</h3>
                            <div className="w-full max-w-xs">
                                <span className="text-bold">Title</span>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} // Updating title state
                                />
                            </div>
                            <div className="w-full max-w-xs">
                                <span className="text-bold">Class:</span>
                                <select
                                    className="select select-bordered w-full max-w-xs mt-2"
                                    onChange={(e) => setClassId(e.target.value)}
                                >
                                    <option>-</option>
                                    {classList.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name} - {item.date}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full max-w-xs mt-5">
                                <span className="text-bold">Content</span>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Type content here"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)} // Updating content state
                                ></textarea>
                            </div>
                            <button className="btn w-full mt-5 max-w-xs">Thêm</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setResult(!result)}>close</button>
                    </form>
                </dialog>
            </div>
            <hr />

            {notifications.reverse().map((item, index) => (
                <Notification key={`${index}+${item.title}`} notification={item} />
            ))}
        </div>
    );
};

export default NotificationView;
