import { useState } from "react";
import { Button } from "antd";
import ModalUser from "./Modal";
import UsersList from "./Contacts";
import Search from "./Search";
import { ModalAction } from "../types";

type Props = {
  contacts: UserData[];
  deleteContacts: (val: UserData["name"]) => void;
  createContacts: (val: UserData) => void;
  updateContacts: (val: UserData & { key: UserData["name"] }) => void;
};

const Home: React.FC<Props> = ({
  contacts,
  deleteContacts,
  createContacts,
  updateContacts,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<UserData[] | null>(null);

  return (
    <div
      style={{
        minWidth: 800,
        margin: "20px auto",
        padding: "10px 170px",
      }}
    >
      <Search updateSearch={setSearch} contacts={contacts} />
      <Button style={{ marginBottom: "30px" }} onClick={() => setOpen(!open)}>
        Create Modal
      </Button>
      <UsersList
        createContacts={createContacts}
        updateContacts={updateContacts}
        search={search}
        contacts={contacts}
        updateOpen={setOpen}
        deleteContacts={deleteContacts}
      />

      {open && (
        <ModalUser
          createContacts={createContacts}
          updateContacts={updateContacts}
          updateOpen={setOpen}
          contacts={contacts}
          action={ModalAction.Create}
        />
      )}
    </div>
  );
};

export default Home;
