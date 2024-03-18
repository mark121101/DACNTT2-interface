import { useEffect, useState } from "react";
import Items from "../Items";
import userService from "../../../services/userServices";

const InfomationView = ({ sales }) => {
    const { id, fullName, birthday, email, phone } = sales;
    const [coursesOfSales, setCoursesOfSale] = useState([]);
    const [studentsAndCourses, setStudentAndCourses] = useState([]);
    const [itemUpdated, setItemUpdated] = useState(false);

    const [courseExtend, setCourseExtend] = useState("");
    const [studentToExtend, setStudentToExtend] = useState("");

    const handleExtend = async (e) => {
        e.preventDefault();
        console.log(`${courseExtend}, ${studentToExtend}`);
        const result = await userService.extendCourse(studentToExtend, courseExtend);
        alert(result.message);
    };

    const handleItemUpdate = () => {
        setItemUpdated(!itemUpdated);
    };
    const [formData, setFormData] = useState({
        saleId: id,
        role: "students",
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

    useEffect(() => {
        const loadCourses = async () => {
            const result = await userService.getCourses();
            setCoursesOfSale(result);
        };

        const loadStudentCourses = async () => {
            const result = await userService.getStudentsSoldCoursesBySale(id);
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
                    <div className="w-24 h-24 overflow-hidden rounded-full">
                        <img
                            className="w-full h-full object-cover"
                            src="https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg"
                            alt="Avatar"
                        />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold">{fullName}</h2>
                        <p className="text-gray-500">ID Salse: {id}</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-600">Sinh nhật: {birthday}</p>
                    <p className="text-gray-600">Email: {email}</p>
                    <p className="text-gray-600">Điện thoại: {phone}</p>
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
                        {/* Thêm học viên mới */}
                        <div className="mx-auto max-w-2xl lg:mx-0 my-10">
                            <button
                                className="btn"
                                onClick={() => document.getElementById("my_modal_classes").showModal()}
                            >
                                Thêm học viên mới
                            </button>
                            <dialog id="my_modal_classes" className="modal">
                                <div className="modal-box">
                                    <form className="py-4 flex items-center flex-col" onSubmit={handleSubmit}>
                                        <h3 className="font-bold text-xl mb-3">Thêm học viên mới</h3>
                                        <div className="w-full max-w-xs">
                                            <span className="text-bold">Họ tên học viên </span>
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
                                                <option>-</option>
                                                {coursesOfSales.map((item, key) => (
                                                    <option key={key} value={item.id}>
                                                        {item.nameCourse} - {item.startDate}
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
                                            <span className="text-bold ">Địa chỉ học viên:</span>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Địa chỉ"
                                                className="input input-bordered w-full mt-2"
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

                                        {/* Chọn học viên */}
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

                                        {/* Chọn khóa */}
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
                                        <button className="btn w-full mt-5 max-w-xs">Gia hạn</button>
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
