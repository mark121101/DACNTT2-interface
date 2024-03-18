import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "../../services/userServices.js";

import InfomationView from "./MainViews/InfomationTeachers.jsx";
import NotificationView from "./MainViews/NotificationsTeacher.jsx";
import ClassesView from "./MainViews/ClassesTeacher.jsx";
import AssignmentsPage from "./MainViews/AssignmentsTeacher.jsx";
const Dashboard = () => {
    const teacher = useSelector((state) => state.user.userInfo);

    return (
        <Routes>
            <Route path="/" element={<InfomationView teacher={teacher} />} />
            <Route path="/notifications" element={<NotificationView />} />
            <Route path="/classes" element={<ClassesView />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
        </Routes>
    );
};

export default Dashboard;
