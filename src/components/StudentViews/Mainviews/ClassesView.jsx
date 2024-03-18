import { useEffect, useState } from "react";
import Classes from "../Classes";
import userService from "../../../services/userServices";
import { useSelector } from "react-redux";

const ClassesView = ({ id, classes }) => {
    const [classOfStudent, setClassesOfStudent] = useState([]);
    const [tab, setTab] = useState("");
    const userLV = useSelector((state) => state.user.userInfo.level);

    const handleClick = (e) => {
        setTab(e.target);
    };

    const inGroupLevel = (level, group) => {
        let grouplv;
        if (level >= 1 && level <= 3) {
            grouplv = 1;
        }
        if (level >= 4 && level <= 6) {
            grouplv = 2;
        }
        if (level >= 7 && level <= 9) {
            grouplv = 3;
        }
        if (level >= 10 && level <= 12) {
            grouplv = 4;
        }
        if (level >= 13 && level <= 15) {
            grouplv = 5;
        }
        if (level >= 16 && level <= 18) {
            grouplv = 6;
        }
        if (level >= 19) {
            grouplv = 7;
        }
        return group == grouplv;
    };

    const isDatePassed = (dateString) => {
        const providedDate = new Date(dateString);
        const currentDate = new Date();
        return currentDate > providedDate;
    };
    useEffect(() => {
        const loadClassesOfStudent = async () => {
            const result = await userService.getClassOfStudent(id);
            setClassesOfStudent(result);
        };
        loadClassesOfStudent();
    }, [tab]);

    return (
        <div className="p-10 sm:ml-64">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lớp học</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600"></p>
                <hr />
            </div>

            <div role="tablist" className="tabs tabs-lifted mt-10">
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab min-w-32"
                    aria-label="Lớp của tôi"
                    // checked
                    defaultChecked={true}
                    onClick={handleClick}
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {classOfStudent.map(
                            (item, index) =>
                                !isDatePassed(item.date) && <Classes key={index} classData={item} status={true} />,
                        )}
                    </div>
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab "
                    className="tab min-w-32"
                    aria-label="Đặt lịch lớp"
                    onClick={handleClick}
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {classes.map(
                            (item, index) =>
                                !isDatePassed(item.date) &&
                                inGroupLevel(userLV, item.min_level) && (
                                    <Classes key={index} user_id={id} classData={item} status={false} />
                                ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesView;
