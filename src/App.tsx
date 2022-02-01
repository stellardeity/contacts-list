/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import Home from "./components/Home";
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "./redux/actions";
import { ContactsDispatch } from "./types";

type Props = {
  contacts: UserData[];
  deleteContacts: (val: UserData["name"]) => void;
  fetchContacts: (val: UserData[]) => void;
  createContacts: (val: UserData) => void;
  updateContacts: (val: UserData & { key: UserData["name"] }) => void;
};

const App: React.FC<Props> = ({
  contacts,
  deleteContacts,
  fetchContacts,
  createContacts,
  updateContacts,
}) => {
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      fetchContacts(JSON.parse(localStorage.getItem("userData") || ""));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Home
      contacts={contacts}
      deleteContacts={deleteContacts}
      createContacts={createContacts}
      updateContacts={updateContacts}
    />
  );
};

const mapStateToProps = (state: UserData[]) => ({ contacts: state });

const mapDispatchToProps = (dispatch: Dispatch<ContactsDispatch>) => ({
  updateContacts: (payload: UserData & { key: UserData["name"] }) =>
    dispatch(updateContact(payload)),
  createContacts: (payload: UserData) => dispatch(createContact(payload)),
  deleteContacts: (name: UserData["name"]) => dispatch(deleteContact(name)),
  fetchContacts: (payload: UserData[]) => dispatch(fetchContacts(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
