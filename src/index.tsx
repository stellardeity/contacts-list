import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import { contactsReducer } from "./redux/contacts";
import "./index.css";
import "antd/dist/antd.css";

const store = createStore(contactsReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
