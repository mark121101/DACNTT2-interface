const Items = ({ classes }) => {
    const { name, timeStart, timeEnd, location, score, date, attended } = classes;
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold">{name}</div>
                        {score ? <div className="text-sm opacity-50">Điểm: {score}</div> : ""}{" "}
                    </div>
                </div>
            </td>
            <td>{location}</td>
            <td>{date}</td>
            <th>
                <button className="btn btn-ghost btn-xs">
                    {timeStart} đến {timeEnd}
                </button>
            </th>
            <td>
                {attended ? (
                    <span className="badge badge-outline badge-success">Completed</span>
                ) : (
                    <span className="badge badge-outline badge-error">Missed</span>
                )}
            </td>
        </tr>
    );
};

export default Items;
