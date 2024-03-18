import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList } from "recharts";
import userService from "../../../services/userServices";
import Excel from "exceljs";

const ReportsPage = () => {
    const [courses, setCourses] = useState([]);
    const [option, setOption] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const countCourses = (courses) => {
        if (!Array.isArray(courses)) {
            console.error("Input is not an array.");
            return;
        }

        const courseMap = new Map(); // Use a map to store course names and their total prices

        // Iterate through the courses array
        courses.forEach((course) => {
            const { nameCourse } = course;
            const priceCourse = 1;
            // If the course name already exists in the map, update its total price
            if (courseMap.has(nameCourse)) {
                courseMap.set(nameCourse, courseMap.get(nameCourse) + priceCourse);
            } else {
                // Otherwise, initialize the total price for the new course name
                courseMap.set(nameCourse, priceCourse);
            }
        });

        // Convert the map into an array of objects { name, value }
        const result = Array.from(courseMap, ([name, value]) => ({ name, value }));

        return result;
    };
    const totalRevenueOfYear = (courses) => {
        // Sử dụng reduce để tính tổng doanh thu của cả năm từ mảng courses
        const totalRevenue = courses.reduce((accumulator, course) => {
            const { endDate, priceCourse } = course;

            // Kiểm tra xem endDate có giá trị và phải là một ngày trong tương lai
            if (endDate && new Date(endDate) > new Date()) {
                accumulator += priceCourse; // Cộng tiền của khóa học vào tổng doanh thu
            }

            return accumulator;
        }, 0);

        // Thêm dấu phẩy cho số để dễ nhìn
        return totalRevenue.toLocaleString();
    };
    const revenueByMonth = (courses) => {
        // Khởi tạo mảng chứa doanh thu của từng tháng, ban đầu có giá trị 0
        const monthlyRevenue = Array(12).fill(0);

        // Lặp qua mỗi khóa học
        courses.forEach((course) => {
            const { startDate, priceCourse } = course;

            // Lấy tháng kết thúc của khóa học
            const Month = new Date(startDate).getMonth();
            // Cộng tiền của khóa học vào tổng doanh thu của tháng tương ứng
            monthlyRevenue[Month] += priceCourse;
        });

        // Mảng chứa tên tháng (từ tháng 1 đến tháng 12)
        const monthNames = [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ];

        // Tạo mảng chứa đối tượng { name, value } cho từng tháng
        const revenueData = monthlyRevenue.map((revenue, index) => {
            return { name: monthNames[index], VND: revenue };
        });
        return revenueData;
    };

    const revenueByDay = (courses) => {
        // Khởi tạo mảng chứa doanh thu của từng ngày, ban đầu có giá trị 0 cho mỗi ngày trong tháng
        const dailyRevenue = Array(30).fill(0);

        // Lặp qua mỗi khóa học
        courses.forEach((course) => {
            const { startDate, priceCourse, nameCourse } = course;
            const month = new Date(startDate).getMonth();
            const day = new Date(startDate).getDate() - 1; // Lấy số ngày, bắt đầu từ 0
            if (month === new Date().getMonth()) {
                dailyRevenue[day] += priceCourse;
            }
        });

        // Tạo mảng chứa tên ngày (từ ngày 1 đến ngày 30)
        const dayNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

        // Tạo mảng chứa đối tượng { name, value } cho từng ngày
        const revenueData = dailyRevenue.map((revenue, index) => {
            return { name: `Ngày ${dayNumbers[index]}`, VND: revenue };
        });
        return revenueData;
    };

    const revenueByTime = (courses) => {
        const date1 = new Date(startDate);
        const date2 = new Date(endDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 30;
        const dailyRevenue = Array(diffDays)
            .fill(0)
            .map(() => ({ name: "", VND: 0 }));

        courses.forEach((course) => {
            const { startDate, priceCourse } = course;
            const courseDate = new Date(startDate);
            const day = courseDate.getDate() - 1; // Adjusted to start from 0

            if (courseDate >= date1 && courseDate <= date2) {
                dailyRevenue[day] = { name: startDate, VND: priceCourse };
            }
        });

        return dailyRevenue;
    };

    useEffect(() => {
        const loadCourses = async () => {
            const result = await userService.getStudents();
            setCourses(result);
        };
        loadCourses();
    }, []);

    const dataSellByOption = () => {
        switch (option) {
            case "year":
                return revenueByMonth(courses);
            case "month":
                return revenueByDay(courses);
            case "date":
                return revenueByTime(courses);
            default:
                break;
        }
    };

    const data = countCourses(courses);
    const dataSell = dataSellByOption();
    const doughnutColors = [
        "#a5159b",
        "#119b31",
        "#1305bc",
        "#81f089",
        "#91b036",
        "#326610",
        "#3efa79",
        "#5b0488",
        "#7b5cd3",
        "#d8c03d",
    ];

    const exportRevenueToExcel = (revenueData) => {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Doanh thu");
        const date = new Date();

        // Thêm dữ liệu vào worksheet
        worksheet.columns = [
            { header: "Tháng", key: "name", width: 20 },
            { header: "Doanh thu (triệu VND)", key: "VND", width: 20 },
        ];
        const dataToExport = revenueData.map(({ name, VND }) => ({
            name,
            VND: VND / 1000000, // Chuyển đổi sang triệu
        }));
        worksheet.addRows(dataToExport);
        // Tạo blob từ workbook
        workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
                const blob = new Blob([buffer], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });

                // Tạo URL cho blob
                const url = window.URL.createObjectURL(blob);

                // Tạo thẻ <a> để tải xuống
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Doanh thu ${date.toDateString()}`);

                // Thêm thẻ <a> vào body và kích hoạt sự kiện click để tự động tải xuống
                document.body.appendChild(link);
                link.click();

                // Xóa URL khi đã tải xuống
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Lỗi khi xuất doanh thu:", error);
            });
    };

    return (
        <div className="p-10 sm:ml-64">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Doanh thu</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600"></p>

                <select
                    className="select select-bordered w-full max-w-xs mr-5"
                    onChange={(e) => setOption(e.target.value)}
                >
                    <option value="year">Doanh thu theo năm</option>
                    <option value="month">Doanh thu theo tháng (hiện tại)</option>
                </select>
                <div className="mt-5">
                    <input
                        className="input input-bordered w-full max-w-xs mr-5"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        className="input input-bordered w-full max-w-xs mt-2 mr-5"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button className="btn w-full max-w-xs mt-2 " onClick={(e) => setOption("date")}>
                        Xem
                    </button>
                </div>
                <button className="btn btn-success my-2" onClick={() => exportRevenueToExcel(dataSell)}>
                    Xuất doanh thu
                </button>
                <hr />
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-rows-1 w-full">
                <div className="w-96 text-center mt-10">
                    <PieChart width={400} height={350} aspect={1}>
                        <Legend />
                        <Tooltip />
                        <Pie dataKey="value" data={data} outerRadius={120} fill="#8884d8" label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={doughnutColors[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <h1>Tổng khóa học: {courses.length} </h1>
                    <hr className="mt-4" />
                </div>
                <div className="w-full text-center mt-10">
                    <BarChart width={400} height={350} data={dataSell} aspect={0} className="p-5">
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value / 1000000} triệu`} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="VND" fill="#8884d8" />
                    </BarChart>
                    <h1>Tổng doanh thu : {totalRevenueOfYear(courses)}</h1>
                    <hr className="mt-4" />
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
