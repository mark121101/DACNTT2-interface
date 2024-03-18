import axios from "axios";
import { Buffer } from "buffer";
Buffer.from("anything", "base64");
const BASE_URL = "http://localhost:3000";

const userService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, { email, password });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    },
    register: async (user) => {
        const response = await axios.post(`${BASE_URL}/users/register`, user);
        return response.data;
    },
    getAvatarURL: async (userId) => {
        try {
            const avatarURL = `${BASE_URL}/users/avatar/${userId}`;
            const response = await axios.get(avatarURL, { responseType: "arraybuffer" });

            const imageData = response.data;

            const imageUrl = `data:image/jpeg;base64,${Buffer.from(imageData).toString("base64")}`;

            return imageUrl;
        } catch (error) {
            console.error("Error getting avatar:", error.message);
            throw new Error("Error getting avatar");
        }
    },
    getAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    },
    getClasses: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/topics`);
            return response.data;
        } catch (error) {
            console.error("Error load classes:", error);
            throw error;
        }
    },
    getClassOfStudent: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/topics/student/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error get classes:", error);
            throw error;
        }
    },
    getCountedStudent: async (idTopics) => {
        try {
            const response = await axios.get(`${BASE_URL}/topics/count/${idTopics}`);
            return response.data;
        } catch (error) {
            console.error("Error get classes:", error);
            throw error;
        }
    },
    getNotification: async (userId) => {
        const result = await axios.get(`${BASE_URL}/notifications/${userId}`);
        return result.data;
    },
    getNotificationOfTeacher: async (teacherId) => {
        const result = await axios.get(`${BASE_URL}/notifications/teachers/${teacherId}`);
        return result.data;
    },
    getAssignments: async (userId) => {
        const result = await axios.get(`${BASE_URL}/assignments/${userId}`);
        return result.data;
    },
    getAssignmentsOfTeacher: async (teacherId) => {
        const result = await axios.get(`${BASE_URL}/assignments/teacher/${teacherId}`);
        return result.data;
    },
    getStudents: async () => {
        const response = await axios.get(`${BASE_URL}/users/students/`);
        return response.data;
    },
    getStudentInTeacherClass: async (teacherId, topicId) => {
        const result = await axios.get(`${BASE_URL}/topics/teacher/${teacherId}/topic/${topicId}`);
        return result.data;
    },
    getStudentNotBookingClass: async (topicId, minlevel) => {
        const response = await axios.get(`${BASE_URL}/topics/not-booking/${topicId}/${minlevel}`);
        return response.data;
    },
    getStudentsDontHaveScore: async (teacherId) => {
        const result = await axios.get(`${BASE_URL}/topics/teacher-score/${teacherId}`);
        return result.data;
    },
    getStudentSubmisson: async (assignment_id) => {
        const response = await axios.get(`${BASE_URL}/assignments/list-students/${assignment_id}`);
        return response.data;
    },
    getCourses: async () => {
        const response = await axios.get(`${BASE_URL}/courses`);
        return response.data;
    },
    getStudentsSoldCoursesBySale: async (saleId) => {
        const response = await axios.get(`${BASE_URL}/courses/sale/${saleId}`);
        return response.data;
    },
    updateUser: async (userId, userData) => {
        const response = await axios.patch(`${BASE_URL}/users/update/${userId}`, userData);
        return response.data;
    },
    updateSubmission: async (assignment_id, data) => {
        const response = await axios.patch(`${BASE_URL}/assignments/${assignment_id}`, data);
        return response.data;
    },
    updatePassword: async (userId, editedPassword) => {
        const { old_password, password } = editedPassword;
        const response = await axios.patch(`${BASE_URL}/users/update/password/${userId}`, {
            old_password,
            password,
        });
        return response.data;
    },
    uploadImage: async (userId, image) => {
        try {
            if (!userId || !image) {
                throw new Error("User id and image are required");
            }

            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("avatar", image);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.post(`${BASE_URL}/users/upload-avatar`, formData, config);
            return response.data;
        } catch (error) {
            console.error("Error uploading image:", error.message);
            throw new Error("Error uploading image");
        }
    },
    createCourse: async (course) => {
        const result = await axios.post(`${BASE_URL}/courses`, course);
        console.log(result);
    },
    createClass: async (lesson) => {
        const response = await axios.post(`${BASE_URL}/topics`, lesson);
        return response.data;
    },
    bookingClass: async (userId, topicId) => {
        const formatDate = (dateObj) => {
            const day = String(dateObj.getDate()).padStart(2, "0");
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const date = new Date();
        const formattedDate = formatDate(date);

        const response = await axios.post(`${BASE_URL}/topics/booking`, {
            userId,
            topicId,
            bookingDate: formattedDate,
        });
        console.log(response);
        return response;
    },
    takeAttendance: async (topicId, data) => {
        const response = await axios.patch(`${BASE_URL}/topics/update-attended/${topicId}`, data);
        return response.data;
    },
    sendNotifi: async (userSent, userReceivedId, title, content) => {
        const formatDate = (dateObj) => {
            const day = String(dateObj.getDate()).padStart(2, "0");
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const date = new Date();
        const formattedDate = formatDate(date);

        const response = await axios.post(`${BASE_URL}/notifications/`, {
            title: title,
            userSent: userSent,
            userReceivedId: userReceivedId,
            date: formattedDate,
            content: content,
        });
        console.log("Thêm thành công");
        return response.data;
    },
    createAssignment: async (data) => {
        const response = await axios.post(`${BASE_URL}/assignments`, data);
        return response.data;
    },
    giveAssignment: async (data) => {
        const response = await axios.post(`${BASE_URL}/assignments/give`, data);
        return response.data;
    },
    saveScore: async (score) => {
        const response = await axios.post(`${BASE_URL}/topics/update-score`, score);
        return response.data;
    },
    extendCourse: async (userId, courseId) => {
        const response = await axios.post(`${BASE_URL}/courses/extend-course`, { userId, courseId });
        return response.data;
    },
};
export default userService;
