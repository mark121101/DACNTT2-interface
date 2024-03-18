// store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // import rootReducer, where you combine all your reducers

const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};

// Tạo store từ reducer và trạng thái đã lưu
const store = createStore(rootReducer, persistedState);

// Lưu trạng thái vào Local Storage mỗi khi store thay đổi
store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
