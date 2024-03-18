import { useState } from "react";
import Notification from "../Notification";

const NotificationView = ({ notifications }) => {
    const [addNoti, setAddNoti] = useState(false);

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
                        <form className="py-4 flex items-center flex-col">
                            <h3 className="font-bold text-xl mb-3">Create new notification</h3>
                            <div className="w-full max-w-xs">
                                <span className="text-bold">Title</span>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                            </div>
                            <div className="w-full max-w-xs mt-5">
                                <span className="text-bold">Content</span>
                                <textarea
                                    className="textarea textarea-bordered  w-full"
                                    placeholder="Type content here"
                                ></textarea>
                            </div>
                            <button className="btn w-full mt-5 max-w-xs">Thêm</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <hr />

            {notifications.map((item, index) => (
                <Notification key={`${index}+${item.title}`} notification={item} />
            ))}
        </div>
    );
};

export default NotificationView;
