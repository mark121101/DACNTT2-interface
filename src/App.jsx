// App.js
import React from "react";
import { useSelector } from "react-redux";
import GuessView from "./views/GuessView";
import StudentView from "./views/StudentView";
import TeacherView from "./views/TeacherView";
import AdminView from "./views/AdminView";
import SalesView from "./views/SalesView";
import "./index.css";

const App = () => {
    const userRole = useSelector((state) => state.auth.role);

    // Render component tương ứng với vai trò của người dùng
    const renderAppropriateView = () => {
        switch (userRole) {
            case "students":
                return <StudentView />;
            case "teachers":
                return <TeacherView />;
            case "admin":
                return <AdminView />;
            case "sales":
                return <SalesView />;
            default:
                return <GuessView />;
        }
    };

    return <>{renderAppropriateView()}</>;
};

export default App;
