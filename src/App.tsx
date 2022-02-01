import { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import Home from "./components/Home";
import {
  createContacts,
  deleteContacts,
  fetchContacts,
  updateContacts,
} from "./redux/actions";
import { ContactsDispatch, UserData } from "./types";

type Props = {
  contacts: UserData[];
  deleteContacts: (val: UserData["name"]) => void;
  fetchContacts: (val: UserData[]) => void;
  createContacts: (val: UserData) => void;
  updateContacts: (val: UserData & { key: string }) => void;
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
  updateContacts: (payload: UserData & { key: string }) =>
    dispatch(updateContacts(payload)),
  createContacts: (payload: UserData) => dispatch(createContacts(payload)),
  deleteContacts: (name: UserData["name"]) => dispatch(deleteContacts(name)),
  fetchContacts: (payload: UserData[]) => dispatch(fetchContacts(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
