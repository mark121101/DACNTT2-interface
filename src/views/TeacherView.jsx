import Sidebar from "../components/SlideBar";
import Dashboard from "../components/TeacherViews/DashboardRoutes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter >
            <Sidebar />
            <Dashboard />
        </BrowserRouter>
    );
}
