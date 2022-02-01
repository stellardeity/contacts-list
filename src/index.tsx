import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import { createStore } from "redux";
import { contactsReducer } from "./redux/contacts";
import { Provider } from "react-redux";

const store = createStore(contactsReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
