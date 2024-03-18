import { useState } from "react";
import userService from "../../services/userServices";
const Items = ({ student }) => {
    const { id, fullName, date, name, topicId } = student;
    const [score, setScore] = useState(0);

    const handleSave = async () => {
        const newScore = {
            userId: id,
            topicId: topicId,
            score: score,
        };
        const result = await userService.saveScore(newScore);
        console.log(result);
    };

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold">{fullName}</div>
                    </div>
                </div>
            </td>
            <td>{topicId}</td>
            <td>{name}</td>
            <th>
                <button className="btn btn-ghost btn-xs">{date}</button>
            </th>
            <td>
                <input
                    type="number"
                    placeholder="Nhập điểm"
                    className="input input-bordered w-full max-w-xs"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                />
            </td>
            <td>
                <button className="btn btn-outline btn-success" onClick={handleSave}>
                    Save
                </button>
            </td>
        </tr>
    );
};

export default Items;
