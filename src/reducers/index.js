// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer"; // import your auth reducer
import userData from "./userReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    user: userData,
});

export default rootReducer;
