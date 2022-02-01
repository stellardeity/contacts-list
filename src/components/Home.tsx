import { Button, Input } from "antd";
import { useState } from "react";
import { ModalAction, UserData } from "../types";
import ModalUser from "./ModalUser";
import UsersList from "./UsersList";

type Props = {
  contacts: UserData[];
  deleteContacts: (val: UserData["name"]) => void;
  createContacts: (val: UserData) => void;
  updateContacts: (val: UserData & { key: string }) => void;
};

const Home: React.FC<Props> = ({
  contacts,
  deleteContacts,
  createContacts,
  updateContacts,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<UserData[] | null>(null);

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(value, "gi");
    setSearch(
      contacts.filter((e) => e.phone.match(pattern) || e.name.match(pattern))
    );
  };

  return (
    <div
      style={{
        minWidth: 800,
        margin: "20px auto",
        padding: "10px 170px",
      }}
    >
      <Input
        style={{ marginBottom: "15px" }}
        onChange={handleSearch}
        placeholder="Поиск"
      />

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
