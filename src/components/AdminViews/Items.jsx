import React, { useState } from "react";

const Items = ({ index, item }) => {
    const { id, fullName, phone, email, address, endDate, nameCourse, priceCourse } = item;
    const numberWithCommas = (number) => {
        return number.toLocaleString("vi-VN");
    };

    // State for tracking edit status
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(item);

    // Function to toggle edit status
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Function to handle changes in input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    // Function to handle save action
    const handleSave = () => {
        // You can perform save action here, e.g., send data to server
        console.log("Edited Item:", editedItem);
        setIsEditing(false);
    };

    return (
        <tr>
            <td>{index}</td>
            <td>{isEditing ? <strong>{id}</strong> : id}</td>
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
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="endDate"
                        value={editedItem.endDate}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                ) : (
                    endDate
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="nameCourse"
                        value={editedItem.nameCourse}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                ) : (
                    nameCourse
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="priceCourse"
                        value={editedItem.priceCourse}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                ) : (
                    numberWithCommas(priceCourse) + "đ"
                )}
            </td>
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
