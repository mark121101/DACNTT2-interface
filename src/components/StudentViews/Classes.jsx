import userService from "../../services/userServices";
import { useState, useEffect } from "react";
const Class = ({ classData, user_id, status }) => {
    const { id, name, teacher, date, timeStart, timeEnd, lesson_details, max_students, topic_id, attended, min_level } =
        classData;
    const [count, setCount] = useState(null);
    const [bookingStatus, setBookingStatus] = useState({});

    const registerClass = async () => {
        try {
            const result = await userService.bookingClass(user_id, id);
            setBookingStatus(result);
        } catch (error) {
            throw error;
        }
    };

    const groupLevel = (group) => {
        switch (group) {
            case 1:
                return "1-2-3";
            case 2:
                return "4-5-6";
            case 3:
                return "7-8-9";
            case 4:
                return "10-11-12";
            case 5:
                return "13-14-15";
            case 6:
                return "16-17-18";
            case 7:
                return "19-20";
        }
    };

    const isDatePassed = (dateString) => {
        const providedDate = new Date(dateString);
        const currentDate = new Date();
        return currentDate > providedDate;
    };

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const result = await userService.getCountedStudent(id);
                setCount(result.current_students);
            } catch (error) {
                console.error("Error fetching count:", error);
            }
        };

        fetchCount();
    }, [topic_id]);

    // Ẩn thông báo sau 2 giây nếu bookingStatus thay đổi
    useEffect(() => {
        const timeout = setTimeout(() => {
            setBookingStatus(0);
        }, 2000);

        return () => clearTimeout(timeout); // Xóa timeout khi component unmount
    }, [bookingStatus]);

    return (
        <div className="max-w-xs mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden min-w-80">
            <div className="px-4 py-2">
                <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt={`${teacher}'s portrait`}
                        />
                    </div>
                    <div className="ml-2">
                        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                        <p className="text-sm text-gray-600">Level: {groupLevel(min_level)}</p>
                    </div>
                    {
                        // Nếu người dùng chưa đăng ký lớp
                        !status ? (
                            <button className="btn btn-outline" onClick={registerClass}>
                                Register
                            </button>
                        ) : // Kiểm tra nếu ngày đã qua
                        attended ? (
                            // Nếu ngày đã qua và người dùng chưa tham gia lớp học
                            isDatePassed(date) && <span className="badge badge-primary badge-outline">Done</span>
                        ) : (
                            // Nếu ngày chưa qua và người dùng đã tham gia lớp học
                            isDatePassed(date) && <span className="badge badge-error badge-outline">Miss</span>
                        )
                    }
                </div>
                <span className="mt-5 badge badge-outline">Date: {date}</span>
                <br />
                <span className="badge badge-outline">
                    Time: from {timeStart} to {timeEnd}
                </span>
                <br />
                <span className="badge badge-primary badge-outline">{lesson_details}</span>
                <br />
                {!status ? (
                    <span className="badge badge-primary badge-outline">
                        {count == null ? "Loading..." : `${count} / ${max_students}`}
                    </span>
                ) : (
                    ""
                )}

                {bookingStatus.status == 202 && (
                    <div role="alert" className="alert alert-warning mt-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>{bookingStatus.data.message}</span>
                    </div>
                )}
                {bookingStatus.status == 201 && (
                    <div role="alert" className="alert alert-success mt-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{bookingStatus.data.message}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Class;
