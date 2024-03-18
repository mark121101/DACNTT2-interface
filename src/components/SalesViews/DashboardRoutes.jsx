import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import InfomationView from "./MainViews/InfomationSale.jsx";
import NotificationView from "./MainViews/NotificationSale.jsx";
import ClassesView from "./MainViews/ClassesSale.jsx";
import AssignmentsPage from "./MainViews/AssignmentsSales.jsx";
import BookingCourses from "./MainViews/BookingCourses.jsx";

const Dashboard = () => {
    const sales = useSelector((state) => state.user.userInfo);

    const notifications = [];
    const classes = [];
    const exams = [];

    return (
        <Routes>
            <Route path="/" element={<InfomationView sales={sales} />} />
            <Route path="/notifications" element={<NotificationView notifications={notifications} />} />
            <Route path="/classes" element={<ClassesView classes={classes} />} />
            <Route path="/assignments" element={<AssignmentsPage exams={exams} />} />
            <Route path="/booking-courses" element={<BookingCourses />} />
        </Routes>
    );
};

export default Dashboard;
