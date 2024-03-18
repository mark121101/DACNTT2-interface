import React, { useState, useEffect } from "react";
import userService from "../../services/userServices";
import { useSelector } from "react-redux";

const StudentList = () => {
    const teacherId = useSelector((state) => state.user.userInfo.id);

    const [students, setStudents] = useState([]);

    const [reload, setReload] = useState(true);
    const [score, setScore] = useState(0);

    const handleSave = async (item) => {
        const newScore = {
            userId: item.id,
            topicId: item.topicId,
            score: score,
        };
        const result = await userService.saveScore(newScore);
        console.log(result);
        setReload(!reload);
    };

    useEffect(() => {
        const loadStudents = async () => {
            const result = await userService.getStudentsDontHaveScore(teacherId);
            setStudents(result);
        };
        loadStudents();
    }, [reload]);

    return (
        <div className="overflow-x-auto">
            <h3 className="my-5 text-3xl font-bold text-center dark:text-white">Danh sách học viên cần nhập điểm</h3>
            {students.length === 0 && <p>Không có học viên nào cần nhập điểm</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Mã học viên</th>
                        <th>Họ Tên</th>
                        <th>Mã lớp</th>
                        <th>Lớp</th>
                        <th>Ngày</th>
                        <th>Thời gian</th>
                        <th>Chủ đề</th>
                        <th>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(students) ? (
                        students.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{item.fullName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.topicId}</td>
                                <td>{item.name}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">{item.date}</button>
                                </th>
                                <td>{item.timeStart}</td>
                                <td>{item.lesson_details}</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Nhập điểm"
                                        className="input input-bordered w-full max-w-xs"
                                        value={item.score}
                                        onChange={(e) => setScore(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-outline btn-success" onClick={() => handleSave(item)}>
                                        Save
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
