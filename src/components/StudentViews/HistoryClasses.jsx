import React, { useState, useEffect } from "react";
import Items from "./Items";
import userService from "../../services/userServices";

const HistoryClasses = ({ student }) => {
    const [classes, setClasses] = useState([]);

    const isDatePassed = (dateString) => {
        const providedDate = new Date(dateString);
        const currentDate = new Date();
        return currentDate > providedDate;
    };

    useEffect(() => {
        const loadHistory = async (idStudent) => {
            try {
                const result = await userService.getClassOfStudent(idStudent);
                setClasses(result);
            } catch (error) {
                console.error("Error loading history:", error);
            }
        };

        loadHistory(student.id);
    }, [student.id]);

    return (
        <div className="overflow-x-auto">
            <h3 className="my-5 text-3xl font-bold text-center dark:text-white">Lịch sử lớp học</h3>
            {classes.length === 0 && <p>Chưa có lịch sử lớp học</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Tên Khóa học</th>
                        <th>Địa điểm</th>
                        <th>Ngày</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((item, index) => isDatePassed(item.date) && <Items key={index} classes={item} />)}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryClasses;
