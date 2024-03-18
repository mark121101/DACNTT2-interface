export const SET_USER_INFO = "SET_USER_INFO";

export const setDataUser = (data) => {
    return {
        type: SET_USER_INFO,
        data: data, // Thay vì payload, sử dụng trực tiếp data
    };
};
