import { useState, useEffect } from "react";
import userService from "../../../services/userServices";
import Items from "../Items";

const InfomationView = ({ sales }) => {
    const { id, fullName } = sales;
    const [coursesOfSales, setCoursesOfSale] = useState([]);
    const [studentsAndCourses, setStudentAndCourses] = useState([]);
    const [itemUpdated, setItemUpdated] = useState(false);

    const [nameCourse, setNameCourse] = useState("");
    const [priceCourse, setPriceCourse] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [courseExtend, setCourseExtend] = useState("");
    const [studentToExtend, setStudentToExtend] = useState("");

    const handleExtend = async (e) => {
        e.preventDefault();
        const result = await userService.extendCourse(studentToExtend, courseExtend);
        alert(result.message);
    };

    const handleAddNewCourse = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create a new course object
        const newCourse = {
            nameCourse: nameCourse,
            priceCourse: priceCourse,
            startDate: startDate,
            endDate: endDate,
        };

        try {
            await userService.createCourse(newCourse);
            alert("Tạo khóa học thành công.");
        } catch (error) {
            alert("Tạo khóa học thất bại.");
        }

        setNameCourse("");
        setPriceCourse("");
        setStartDate("");
        setEndDate("");
    };

    const [formData, setFormData] = useState({
        saleId: id,
        role: "",
        fullName: "",
        course: "",
        initialLevel: "",
        birthday: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.register(formData);
            alert("Đăng kí thành công.");
            setFormData({
                fullName: "",
                course: "",
                initialLevel: "",
                birthday: "",
                email: "",
                phone: "",
                address: "",
            });
        } catch (error) {
            alert("Đăng kí thất bại.");
        }
    };
    const handleItemUpdate = () => {
        setItemUpdated(!itemUpdated);
    };

    useEffect(() => {
        const loadCourses = async () => {
            const result = await userService.getCourses();
            setCoursesOfSale(result);
        };

        const loadStudentCourses = async () => {
            const result = await userService.getStudents();
            setStudentAndCourses(result);
        };

        loadStudentCourses();
        loadCourses();
    }, [itemUpdated]);
    const calculateTotalPrice = (items) => {
        let totalPrice = 0;
        items.forEach((item) => {
            totalPrice += item.priceCourse;
        });
        return totalPrice.toLocaleString("vi-VN");
    };
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold">{fullName}</h2>
                        <p className="text-gray-500">ID: {id}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-10">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Danh sách học viên đã mua khóa học
                    </h2>
                    <p className="mt-5 mb-3 text-lg leading-8 text-gray-600">
                        Tổng giá khóa bán được: <strong> {calculateTotalPrice(studentsAndCourses)}</strong>đ
                    </p>
                    <hr />
                    <div className="flex">
                        {/* Thêm học viên */}
                        <div className="mx-auto max-w-2xl lg:mx-0 my-10">
                            <button
                                className="btn"
                                onClick={() => document.getElementById("my_modal_classes").showModal()}
                            >
                                Thêm người dùng
                            </button>
                            <dialog id="my_modal_classes" className="modal">
                                <div className="modal-box">
                                    <form className="py-4 flex items-center flex-col" onSubmit={handleSubmit}>
                                        <h3 className="font-bold text-xl mb-3">Thêm người dùng mới</h3>
                                        <div className="w-full max-w-xs">
                                            <span className="text-bold">Họ tên </span>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Họ và tên"
                                                className="input input-bordered w-full mt-2"
                                            />
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Khóa học:</span>
                                            <select
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                                className="select select-bordered w-full max-w-xs mt-2"
                                            >
                                                <option value="">- Chọn khóa học -</option>
                                                {coursesOfSales.map((item, key) => (
                                                    <option key={key} value={item.id}>
                                                        {item.nameCourse}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Trình độ ban đầu:</span>
                                            <input
                                                type="text"
                                                name="initialLevel"
                                                value={formData.initialLevel}
                                                onChange={handleChange}
                                                placeholder="Trình độ ban đầu"
                                                className="input input-bordered w-full mt-2"
                                            />
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Sinh nhật:</span>
                                            <input
                                                type="date"
                                                name="birthday"
                                                value={formData.birthday}
                                                onChange={handleChange}
                                                className="input input-bordered w-full mt-2"
                                            />
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold ">Email:</span>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="input input-bordered w-full mt-2"
                                            />
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold ">Số điện thoại:</span>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Số điện thoại"
                                                className="input input-bordered w-full mt-2"
                                            />
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold ">Địa chỉ:</span>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Địa chỉ"
                                                className="input input-bordered w-full mt-2"
                                            />
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Phân quyền:</span>
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="select select-bordered w-full max-w-xs mt-2"
                                            >
                                                <option value="">- Chọn phân quyền -</option>
                                                <option value="students">Students</option>
                                                <option value="teachers">Teachers</option>
                                                <option value="sales">Sales</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn w-full mt-5 max-w-xs">
                                            Thêm
                                        </button>
                                    </form>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                        {/* Gia hạn học viên */}
                        <div className="mx-auto max-w-2xl lg:mx-0 my-10">
                            <button
                                className="btn mx-5"
                                onClick={() => document.getElementById("my_modal_classes2").showModal()}
                            >
                                Gia hạn học viên
                            </button>
                            <dialog id="my_modal_classes2" className="modal">
                                <div className="modal-box">
                                    <form className="py-4 flex items-center flex-col" onSubmit={handleExtend}>
                                        <h3 className="font-bold text-xl mb-3">Gia hạn học viên</h3>

                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Học viên:</span>
                                            <select
                                                className="select select-bordered w-full max-w-xs mt-2"
                                                onChange={(e) => setStudentToExtend(e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {studentsAndCourses.map((item, key) => (
                                                    <option key={key} value={item.user_id}>
                                                        {item.user_id} - {item.fullName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Khóa học:</span>
                                            <select
                                                className="select select-bordered w-full max-w-xs mt-2"
                                                onChange={(e) => setCourseExtend(e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {coursesOfSales.map((item, key) => (
                                                    <option key={key} value={item.id}>
                                                        {item.nameCourse} - {item.startDate}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button className="btn w-full mt-5 max-w-xs">Thêm</button>
                                    </form>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>

                        {/* Thêm khóa học */}
                        <div className="mx-auto max-w-2xl lg:mx-0 my-10">
                            <button
                                className="btn mr-5"
                                onClick={() => document.getElementById("new_courses").showModal()}
                            >
                                Thêm khóa học
                            </button>
                            <dialog id="new_courses" className="modal">
                                <div className="modal-box">
                                    <form className="py-4 flex items-center flex-col" onSubmit={handleAddNewCourse}>
                                        <h3 className="font-bold text-xl mb-3">Thêm khóa học mới</h3>

                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Tên khóa học:</span>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full mt-2"
                                                value={nameCourse}
                                                onChange={(e) => setNameCourse(e.target.value)}
                                            />
                                        </div>

                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Ngày bắt đầu:</span>
                                            <input
                                                type="date"
                                                className="input input-bordered w-full mt-2"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Ngày kết thúc:</span>
                                            <input
                                                type="date"
                                                className="input input-bordered w-full mt-2"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="w-full mt-5 max-w-xs">
                                            <span className="text-bold">Giá:</span>
                                            <input
                                                type="number"
                                                className="input input-bordered w-full mt-2"
                                                value={priceCourse}
                                                onChange={(e) => setPriceCourse(e.target.value)}
                                            />
                                        </div>

                                        <button type="submit" className="btn w-full mt-5 max-w-xs">
                                            Thêm
                                        </button>
                                    </form>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="overflow-x-auto mt-10">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Mã HV</th>
                                <th>Họ Tên</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Hạn tài khoản</th>
                                <th>Khóa</th>
                                <th>Giá khóa học</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsAndCourses.map((item, i) => (
                                <Items key={i} index={i + 1} item={item} onUpdate={handleItemUpdate} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InfomationView;
