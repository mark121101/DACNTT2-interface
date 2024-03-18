import { useSelector } from "react-redux";
import userService from "../../services/userServices";
import { useEffect, useState } from "react";
const Classes = ({ classes, status }) => {
    const teacherId = useSelector((state) => state.user.userInfo.id);
    const { id, name, teacher, date, timeStart, timeEnd, lesson_details, min_level } = classes;
    const [lesson, setLesson] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [reload, setReload] = useState(true);

    const handleAttendTemp = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            // Nếu checkbox được check, thêm mục vào checkedItems
            setCheckedItems((prevItems) => [...prevItems, { studentId: name, value: true }]);
        } else {
            // Nếu checkbox được bỏ check, loại bỏ mục khỏi checkedItems
            setCheckedItems((prevItems) => prevItems.filter((item) => item.studentId !== name));
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

    const handleAttend = async (e) => {
        const classId = id;
        const result = await userService.takeAttendance(classId, checkedItems);
        alert(result.message);
        setReload(!reload);
    };

    useEffect(() => {
        const loadClasses = async () => {
            const teacherClass = await userService.getStudentInTeacherClass(teacherId, id);
            setLesson(teacherClass);
        };
        loadClasses();
    }, [reload]);

    return (
        <div>
            <div className="max-w-xs mx-auto bg-white border border-dashed rounded-lg overflow-hidden">
                <div className="px-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="ml-2">
                            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                            <p className="text-sm text-gray-600">{teacher}</p>
                        </div>

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={() => document.getElementById(`Modal_${id}`).showModal()}>
                            Class list
                        </button>
                        <dialog id={`Modal_${id}`} className="modal">
                            <div className="modal-box">
                                <h1 className="text-xl font-bold my-4">Classlist attendance in {date}</h1>
                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <form method="dialog" className="w-full">
                                        <table className="table overscroll-y-scroll h-32">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Attended</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {lesson.length > 0 ? (
                                                    lesson.map((student, index) => (
                                                        <tr
                                                            className="hover cursor-pointer"
                                                            key={`${classes.id}.${index}`}
                                                        >
                                                            <th>{index + 1}</th>
                                                            <td>{student.fullName}</td>
                                                            <td>{student.phone}</td>
                                                            {student.attended == 0 ? (
                                                                <td>
                                                                    <label>
                                                                        <input
                                                                            name={student.id}
                                                                            type="checkbox"
                                                                            data-classid={classes.id}
                                                                            className="checkbox"
                                                                            onChange={handleAttendTemp}
                                                                        />
                                                                    </label>
                                                                </td>
                                                            ) : (
                                                                <td>
                                                                    <label>
                                                                        <input
                                                                            name={student.id}
                                                                            value={student.attended}
                                                                            type="checkbox"
                                                                            className="checkbox"
                                                                            checked
                                                                            readOnly
                                                                        />
                                                                    </label>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td>Không có học sinh đăng kí</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <button className="btn btn-primary w-full my-2" onClick={handleAttend}>
                                            Save
                                        </button>
                                        <button
                                            className="btn w-full"
                                            onClick={() => {
                                                setCheckedItems([]);
                                            }}
                                        >
                                            Close
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <span className="mt-5 badge badge-warning">Level: {groupLevel(min_level)}</span>
                    <br />
                    <span className="mt-2 badge">Ngày: {date}</span>
                    <br />
                    <span className="mt-2 badge">
                        Thời gian: {timeStart} đến {timeEnd}
                    </span>
                    <br />
                    <span className="mt-2 badge badge-primary badge-outline">{lesson_details}</span>
                </div>
            </div>
        </div>
    );
};

export default Classes;
