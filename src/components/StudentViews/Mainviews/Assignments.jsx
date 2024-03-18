import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../../../services/userServices";

const AssignmentsPage = ({}) => {
    const [exams, setExams] = useState([]);

    const studentId = useSelector((state) => state.user.userInfo.id);
    useEffect(() => {
        const loadAssignments = async () => {
            const result = await userService.getAssignments(studentId);
            setExams(result);
        };
        loadAssignments();
    }, []);

    
    return (
        <div className="p-4 sm:ml-64">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bài tập</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">Các bài tập được giao của bạn.</p>
            </div>
            <div className="mx-auto mt-5 grid  max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {exams.length > 0 &&
                    exams.map((exam, index) => (
                        <article
                            key={index}
                            className="flex max-w-xl flex-col items-start justify-between border border-dashed p-4 rounded-lg"
                        >
                            <div className="flex items-center gap-x-4 text-xs">
                                <time className="text-gray-500">{exam.deadline}</time>
                                <span className="badge badge-outline badge-primary">{exam.type}</span>
                                {exam.submisson ? (
                                    <span className="badge badge-outline badge-success">Hoàn thành</span>
                                ) : (
                                    <span className="badge badge-outline badge-warning">Chưa hoàn thành</span>
                                )}
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <span>{exam.title}</span>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{exam.content}</p>
                            </div>
                            <div className="relative mt-8 flex items-center justify-between gap-x-4 w-full">
                                <div className="text-sm leading-6">
                                    <p className="text-gray-600">Lớp: {exam.topic} </p>
                                    <p className="font-semibold text-gray-900">Giảng viên: {exam.teacher}</p>
                                </div>
                                <a className="btn btn-info btn-outline" href={exam.submit_link} target="_blank">
                                    Chi tiết
                                </a>
                            </div>
                        </article>
                    ))}
            </div>
        </div>
    );
};
export default AssignmentsPage;
