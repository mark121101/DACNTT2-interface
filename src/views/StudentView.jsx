import Sidebar from "../components/SlideBar";
import Dashboard from "../components/StudentViews/DashboardRoutes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter >
            <Sidebar />
            <Dashboard />
        </BrowserRouter>
    );
}
