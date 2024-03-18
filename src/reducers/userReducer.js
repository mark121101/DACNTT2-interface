import { SET_USER_INFO } from "../actions/userActions";

const initialState = {
    userInfo: {}, // Thay đổi tên trường và giá trị ban đầu
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.data, // Lưu trữ thông tin người dùng vào trường userInfo
            };
        default:
            return state;
    }
};

export default userReducer;
