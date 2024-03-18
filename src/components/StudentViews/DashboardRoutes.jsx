import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import userService from "../../services/userServices";

import InfomationView from "./Mainviews/InfomationStudent";
import NotificationView from "./Mainviews/NotificationsView";
import ClassesView from "./Mainviews/ClassesView";
import AssignmentsPage from "./Mainviews/Assignments";

const Dashboard = () => {
    const [classes, setClasses] = useState([]);

    const userInfo = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        const loadClasses = async () => {
            const result = await userService.getClasses();
            setClasses(result);
        };
        loadClasses();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<InfomationView student={userInfo} />} />
            <Route path="/notifications" element={<NotificationView />} />
            <Route path="/classes" element={<ClassesView id={userInfo.id} classes={classes} />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
        </Routes>
    );
};

export default Dashboard;
