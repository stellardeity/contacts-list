/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import { fetchContacts } from "./redux/actions";
import { selectContacts } from "./redux/selectors";

const App: React.FC = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      try {
        dispatch(
          fetchContacts(JSON.parse(localStorage.getItem("userData") || ""))
        );
      } catch (e) {
        localStorage.setItem("userData", JSON.stringify([]));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(contacts));
  }, [contacts]);

  return <Home />;
};

export default App;
