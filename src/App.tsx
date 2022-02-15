import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { $contacts, post } from "./features/home/model";
import { Home } from "./features/home/view";

const App: React.FC = () => {
  const contacts = useStore($contacts);
  useEffect(() => {
    post(JSON.parse(localStorage.getItem("userData") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(contacts));
  }, [contacts]);

  return <Home />;
};

export default App;
