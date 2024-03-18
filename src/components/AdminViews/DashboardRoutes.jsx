import { Routes, Route } from "react-router-dom";
import InfomationView from "./MainViews/InfomationAdmin.jsx";
import NotificationView from "./MainViews/NotificationAdmin.jsx";
import UsersView from "./MainViews/UsersAdmin.jsx";
import ReportPage from "./MainViews/Reports.jsx";
import BookingCourses from "./MainViews/BookingCourses.jsx";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const sales = useSelector((state) => state.user.userInfo);
    const notifications = [];
    const classes = [];
    const exams = [];

    return (
        <Routes>
            <Route path="/" element={<InfomationView sales={sales} />} />
            <Route path="/notifications" element={<NotificationView notifications={notifications} />} />
            <Route path="/users" element={<UsersView classes={classes} />} />
            <Route path="/reports" element={<ReportPage exams={exams} />} />
            <Route path="/booking-courses" element={<BookingCourses />} />
        </Routes>
    );
};

export default Dashboard;
