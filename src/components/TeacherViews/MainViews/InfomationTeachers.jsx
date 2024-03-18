import { useState, useEffect } from "react";
import StudentList from "../StudentsList";
import userService from "../../../services/userServices";
import ImageUploader from "../ImageUploader";
const InfomationView = ({ teacher }) => {
    const { id, fullName, birthday, email, phone, address } = teacher;

    const [editedStudent, setEditedStudent] = useState(teacher);
    const [editedPassword, setEditedPassword] = useState({
        old_password: "",
        password: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [isChangeAvatar, setIsChangeAvatar] = useState(false);
    const [imageURL, setImageURL] = useState("https://top10camau.vn/wp-content/uploads/2022/10/avatar-meo-cute-5.jpg");

    useEffect(() => {
        const loadAvatar = async () => {
            const result = await userService.getAvatarURL(id);
            // if (result)
            setImageURL(result);
        };
        loadAvatar();
    }, [isChangeAvatar]);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleEditAvt = () => {
        setIsChangeAvatar(!isChangeAvatar);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedStudent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setEditedPassword((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChange = async () => {
        const result = await userService.updateUser(id, editedStudent);
        alert(result.message);
        dispatch(setDataUser(editedStudent));
        handleEdit();
    };

    const handSavePassword = async () => {
        try {
            const result = await userService.updatePassword(id, editedPassword);
            alert(result.message);
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        }
    };

    const renderStudentInformation = () => {
        return (
            <div>
                <h2 className="text-lg font-semibold">{fullName}</h2>
                <p className="text-gray-500">Mã giảng viên: {id}</p>
                <p className="text-gray-600">
                    <strong>Email:</strong> {email}
                </p>
                <p className="text-gray-600">
                    <strong>Số điện thoại: </strong>
                    {phone}
                </p>
                <p className="text-gray-600">
                    <strong>Ngày sinh:</strong> {birthday}
                </p>
                <p className="text-gray-600">
                    <strong>Địa chỉ:</strong> {address}
                </p>
            </div>
        );
    };

    const renderEditStudentInformation = () => {
        return (
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{fullName}</h2>
                <p className="text-gray-500">Mã giảng viên: {id}</p>
                <p className="text-gray-600">
                    <strong>Email:</strong> {email}
                </p>
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="input input-bordered w-full max-w-xs mt-2"
                    name="phone"
                    value={editedStudent.phone}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    placeholder="Ngày sinh"
                    className="input input-bordered w-full max-w-xs mt-2"
                    name="birthday"
                    value={editedStudent.birthday}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="input input-bordered w-full max-w-xs mt-2"
                    name="address"
                    value={editedStudent.address}
                    onChange={handleChange}
                />
                <button className="btn text-white bg-gray-900 hover:bg-gray-500 mt-5" onClick={handleSaveChange}>
                    Sửa
                </button>
                <button className="btn mt-2  btn-outline" onClick={handleEdit}>
                    Hủy
                </button>
            </div>
        );
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="flex items-center mb-4 lg:flex-row md:flex-col ">
                    {!isChangeAvatar && (
                        <div className="w-24 h-24 min-w-24 overflow-hidden rounded-full mr-2">
                            <img className="w-full h-full object-cover" src={imageURL} alt="Avatar" />
                        </div>
                    )}
                    {isChangeAvatar ? (
                        <div className="flex flex-col">
                            <ImageUploader onSave={handleEditAvt} />
                            <button className="btn btn-outline" onClick={handleEditAvt}>
                                Hủy
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="mx-4">
                        {isEdit ? renderEditStudentInformation() : renderStudentInformation()}
                        {!isEdit && (
                            <div>
                                <button className="btn mr-5" onClick={handleEditAvt}>
                                    Đổi Avatar
                                </button>
                                <button className="btn mt-2 mr-5" onClick={handleEdit}>
                                    Sửa
                                </button>

                                <button
                                    className="btn mt-2"
                                    onClick={() => document.getElementById("change_password").showModal()}
                                >
                                    Đổi mật khẩu
                                </button>
                                <dialog id="change_password" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Đổi mật khẩu</h3>
                                        <p className="py-4">Bấm ESC để thoát</p>
                                        <div className="modal-action">
                                            <form method="dialog" className="flex flex-col w-full">
                                                <input
                                                    type="password"
                                                    placeholder="Mật khẩu cũ"
                                                    className="input input-bordered w-full mt-2"
                                                    name="old_password"
                                                    value={editedPassword.old_password}
                                                    onChange={handleChangePassword}
                                                    autoComplete="off"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Mật khẩu mới"
                                                    className="input input-bordered w-full mt-2"
                                                    name="password"
                                                    value={editedPassword.password}
                                                    onChange={handleChangePassword}
                                                    autoComplete="off"
                                                />

                                                <button
                                                    className="btn btn-primary w-full mt-5"
                                                    onClick={handSavePassword}
                                                >
                                                    Lưu
                                                </button>
                                                <button className="btn btn-outline w-full mt-5">Đóng</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-10">
                <StudentList />
            </div>
        </div>
    );
};

export default InfomationView;
