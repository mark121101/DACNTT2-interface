import { SET_ROLE } from "../actions/authActions";

const initialState = {
    isLoggedIn: false,
    role: "guess", // Giả định vai trò mặc định là 'guess'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROLE:
            return {
                ...state,
                role: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
