//authActions
export const SET_ROLE = "SET_ROLE";

export const setRole = (role) => {
    return {
        type: SET_ROLE,
        payload: role,
    };
};
