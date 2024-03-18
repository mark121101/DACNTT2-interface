import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "../../../services/userServices";

const AssignmentsPage = () => {
    const teacherId = useSelector((state) => state.user.userInfo.id);
    const [classList, setClassList] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [studentsList, setStudentsList] = useState([]);
    const [classId, setClassId] = useState("");
    const [type, setType] = useState("");
    const [submit, setSubmit] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [result, setResult] = useState(true);
    const [assignmentId, setAssignmentsId] = useState("");
    const [deadline, setDeadline] = useState("");
    const [checkedItems, setCheckedItems] = useState([]);

    const handleLoadClass = async (id) => {
        const result = await userService.getStudentSubmisson(id);
        setStudentsList(result);
    };

    const handleTempSubmit = (e) => {
        const { name, checked } = e.target;

        if (checked) {
            setCheckedItems((prevItems) => [...prevItems, { studentId: name, value: true }]);
        } else {
            setCheckedItems((prevItems) => prevItems.filter((item) => item.studentId !== name));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!classId || !submit || !title || !content || !teacherId) {
            alert("Please fill in all fields");
            return;
        }
        // title, content, date, type, topic, teacher
        const newAssignment = {
            title,
            content,
            topic: classId,
            type: type,
            submit,
            teacherId,
        };
        try {
            const result = await userService.createAssignment(newAssignment);
            alert(result.message);
        } catch (err) {
            alert("Lỗi");
        }
    };

    const handleGiveAssignment = async (e) => {
        e.preventDefault();
        const studentAssignment = {
            classId: classId,
            assignmentId: assignmentId,
            deadline: deadline,
        };
        const result = await userService.giveAssignment(studentAssignment);
        alert(result.message);
    };

    const handleSaveSubmission = async (assignmentId) => {
        const result = await userService.updateSubmission(assignmentId, checkedItems);
        console.log(result.message);
    };

    useEffect(() => {
        const loadClass = async () => {
            const classes = await userService.getClasses();
            setClassList(classes);
        };
        const loadAssignments = async () => {
            const result = await userService.getAssignmentsOfTeacher(teacherId);
            setAssignments(result);
        };

        loadAssignments();
        loadClass();
    }, [result]);

    return (
        <div className="p-10 sm:ml-64">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Assignments</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600"></p>
            </div>
            <div className="mx-auto max-w-2xl lg:mx-0 my-10">
                <button className="btn" onClick={() => document.getElementById("my_modal_new_assignments").showModal()}>
                    Create new assignments
                </button>
                <dialog id="my_modal_new_assignments" className="modal">
                    <div className="modal-box">
                        <form className="py-4 flex items-center flex-col" onSubmit={handleSubmit}>
                            <h3 className="font-bold text-xl mb-3">Create new assignments</h3>

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

                            <div className="w-full mt-5 max-w-xs">
                                <span className="text-bold">Type:</span>
                                <select
                                    className="select select-bordered w-full max-w-xs mt-2"
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="Reading">Reading</option>
                                    <option value="Listening">Listening</option>
                                    <option value="Writing">Writing</option>
                                    <option value="Speaking">Speaking</option>
                                </select>
                            </div>
                            <div className="w-full mt-5 max-w-xs">
                                <span className="text-bold">Submit via:</span>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full mt-2"
                                    value={submit}
                                    onChange={(e) => setSubmit(e.target.value)}
                                />
                            </div>
                            <div className="w-full mt-5 max-w-xs">
                                <span className="text-bold ">Title Assignments:</span>
                                <input
                                    type="text"
                                    placeholder="Type title here"
                                    className="input input-bordered w-full mt-2"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="w-full mt-5 max-w-xs">
                                <span className="text-bold ">Content Assignments:</span>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Type content here"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <button className="btn btn-primary w-full mt-5 max-w-xs">Thêm</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setResult(!result)}>close</button>
                    </form>
                </dialog>

                {/* Give Assignment for class */}
                <button
                    className="btn btn-primary ml-2"
                    onClick={() => document.getElementById("modal_give_assignment").showModal()}
                >
                    Give assignment
                </button>
                <dialog id="modal_give_assignment" className="modal">
                    <div className="modal-box">
                        <form className="py-4 flex items-center flex-col" onSubmit={handleGiveAssignment}>
                            <h3 className="font-bold text-xl mb-3">Give assignment</h3>

                            {/* Select a class */}
                            <div className="w-full max-w-xs">
                                <span className="text-bold">Class:</span>
                                <select
                                    className="select select-bordered w-full max-w-xs mt-2"
                                    onChange={(e) => setClassId(e.target.value)}
                                >
                                    <option value="">-</option>
                                    {classList.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name} - {item.date}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Select an assignment */}
                            <div className="w-full max-w-xs">
                                <span className="text-bold">Assignments:</span>
                                <select
                                    className="select select-bordered w-full max-w-xs mt-2"
                                    onChange={(e) => setAssignmentsId(e.target.value)}
                                >
                                    <option value="">-</option>
                                    {assignments.map((item) => (
                                        <option key={item.assignment_id} value={item.assignment_id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Input date as deadline*/}
                            <div className="w-full max-w-xs">
                                <span className="text-bold">Deadline:</span>
                                <input
                                    type="date"
                                    className="input input-bordered w-full mt-2"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary w-full mt-5 max-w-xs">Giao bài</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setResult(!result)}>close</button>
                    </form>
                </dialog>
            </div>

            <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {assignments &&
                    assignments.map((exam) => (
                        <article
                            key={exam.assignment_id}
                            className="flex max-w-xl flex-col items-start justify-between border rounded-lg p-5"
                        >
                            <div className="flex items-center gap-x-4 text-xs">
                                {exam.deadline && <time className="text-gray-500">{exam.deadline}</time>}
                                <p className="badge badge-primary badge-outline">{exam.type}</p>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <span>{exam.title}</span>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{exam.content}</p>
                            </div>
                            <div className="relative mt-8 flex items-center justify-between gap-x-4 w-full">
                                <div className="flex text-sm leading-6">
                                    <a className="btn btn-primary" href={exam.submit_link} target="_blank">
                                        Chi tiết
                                    </a>
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button
                                        className="btn btn-accent ml-2"
                                        onClick={() => {
                                            document.getElementById(`class_list_${exam.assignment_id}`).showModal();
                                            handleLoadClass(exam.assignment_id);
                                        }}
                                    >
                                        Danh sách lớp
                                    </button>
                                    <dialog id={`class_list_${exam.assignment_id}`} className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Danh sách lớp </h3>
                                            <p className="py-4">Press ESC key or click the button below to close</p>
                                            <div className="modal-action">
                                                <form method="dialog" className="w-full">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <table className="table overscroll-y-scroll h-32">
                                                        {/* head */}
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Name</th>
                                                                <th>Phone</th>
                                                                <th>Attended</th>
                                                            </tr>
                                                            {studentsList.map((row) => (
                                                                <tr key={row.student_id}>
                                                                    <td>{row.student_id}</td>
                                                                    <td>{row.fullName}</td>
                                                                    <td>{row.phone}</td>
                                                                    <td>
                                                                        {row.submisson ? (
                                                                            <p></p>
                                                                        ) : (
                                                                            <input
                                                                                type="checkbox"
                                                                                className="checkbox"
                                                                                name={row.student_id}
                                                                                onChange={handleTempSubmit}
                                                                            />
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </thead>
                                                        <tbody></tbody>
                                                    </table>
                                                    <button
                                                        className="btn btn-primary w-full"
                                                        onClick={() => handleSaveSubmission(exam.assignment_id)}
                                                    >
                                                        Lưu
                                                    </button>
                                                    <button className="btn mt-2 w-full">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                        </article>
                    ))}
            </div>
        </div>
    );
};
export default AssignmentsPage;
