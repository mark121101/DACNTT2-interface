// index.js (hoặc App.js nếu bạn sử dụng function component làm main)
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store"; // import the Redux store
import App from "./App"; // import your main App component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
