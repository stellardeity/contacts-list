import { useStore } from "effector-react";
import React, { useEffect } from "react";
import Home from "./components/Home";
import { $contacts, post } from "./effector";

const App: React.FC = () => {
  const contacts = useStore($contacts);
  console.log(contacts);

  useEffect(() => {
    post(JSON.parse(localStorage.getItem("userData") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(contacts));
  }, [contacts]);

  return <Home />;
};

export default App;
