import { useDispatch } from "react-redux";
import { setRole } from "../../actions/authActions";
import { setDataUser } from "../../actions/userActions";
import userService from "../../services/userServices";

const Navigative = () => {
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await userService.login(email, password);
            const role = response.role;
            dispatch(setDataUser(response));
            dispatch(setRole(role));
        } catch (error) {
            console.error("Error logging in:", error);
            alert(error.response.message);
        }
    };

    return (
        <div className="navbar bg-base-100 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a className="text-l" href="#learn">
                                Học tiếng Anh
                            </a>
                        </li>

                        <li>
                            <a className="text-l" href="#courses">
                                Các khóa học
                            </a>
                        </li>
                        <li>
                            <a className="text-l" href="#courses">
                                Học phí
                            </a>
                        </li>
                        <li>
                            <a className="text-l" href="#footer">
                                Về chúng tôi
                            </a>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">English.</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a className="text-xl" href="#learn">
                            Học tiếng Anh
                        </a>
                    </li>

                    <li>
                        <a className="text-xl" href="#courses">
                            Các khóa học
                        </a>
                    </li>
                    <li>
                        <a className="text-xl" href="#courses">
                            Học phí
                        </a>
                    </li>
                    <li>
                        <a className="text-xl" href="#footer">
                            Về chúng tôi
                        </a>
                    </li>
                </ul>
            </div>
            {/* <a className="btn text-xl">Sign in</a> */}
            <div className="drawer drawer-end navbar-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn">
                        Đăng nhập
                    </label>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <form className="my-10 mr-3 text-center" onSubmit={handleLogin}>
                            <h1 className="text-xl mb-5">Đăng nhập</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input type="text" name="email" className="grow" placeholder="Email" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="password"
                                    name="password"
                                    className="grow"
                                    placeholder="Password"
                                    autoComplete="off"
                                />
                            </label>
                            <button className="btn btn-primary mt-5 w-full">Đăng nhập</button>
                        </form>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navigative;
