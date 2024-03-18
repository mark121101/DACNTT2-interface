import React, { useState } from "react";
import userService from "../../services/userServices";

const Items = ({ index, item, onUpdate }) => {
    const { user_id, fullName, phone, email, address, endDate, nameCourse, priceCourse } = item;
    const numberWithCommas = (number) => {
        return number.toLocaleString("vi-VN");
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(item);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSave = async () => {
        try {
            const result = await userService.updateUser(user_id, editedItem);
            console.log(result);
            toggleEdit();
            onUpdate();
        } catch (error) {
            toggleEdit();
            onUpdate();
        }
    };

    return (
        <tr key={user_id}>
            <td>{index}</td>
            <td>{isEditing ? <strong>{user_id}</strong> : user_id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="fullName"
                        value={editedItem.fullName}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                ) : (
                    fullName
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="phone"
                        value={editedItem.phone}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                ) : (
                    phone
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="email"
                        value={editedItem.email}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                ) : (
                    email
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="address"
                        value={editedItem.address}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                ) : (
                    address
                )}
            </td>
            <td>{endDate}</td>
            <td>{nameCourse}</td>
            <td>{numberWithCommas(priceCourse)}đ</td>
            <td>
                {isEditing ? (
                    <button className="btn btn-outline btn-success" onClick={handleSave}>
                        Save
                    </button>
                ) : (
                    <button className="btn btn-outline " onClick={toggleEdit}>
                        Edit
                    </button>
                )}
            </td>
        </tr>
    );
};

export default Items;
