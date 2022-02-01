import { useMemo, useState } from "react";
import { Button } from "antd";
import { ModalAction } from "../types";
import ModalUser from "./Modal";

type Props = {
  search: UserData[] | null;
  contacts: UserData[];
  updateOpen: (val: boolean) => void;
  deleteContacts: (val: UserData["name"]) => void;
  updateContacts: (val: UserData & { key: UserData["name"] }) => void;
  createContacts: (val: UserData) => void;
};

const UsersList: React.FC<Props> = ({
  search,
  contacts,
  deleteContacts,
  updateContacts,
  createContacts,
}) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<UserData | null>(null);
  const list = useMemo(() => search || contacts, [contacts, search]);

  const handleEditData = ({ name, phone }: UserData) => {
    setOpen(true);
    setInfo({ name, phone });
  };

  return (
    <div>
      {search && search.length !== contacts.length ? (
        <h2>Найдено контактов {search.length}</h2>
      ) : (
        <h2>Общее количество контактов {contacts.length}</h2>
      )}
      {list.map(({ name, phone }, i) => (
        <div
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: list.length - 1 === i ? "none" : "1px solid #e2e2e2",
          }}
          key={name}
        >
          <div>
            <h3>{name}</h3>
            <p>{phone}</p>
          </div>
          <div>
            <Button onClick={() => handleEditData({ name, phone })}>
              Edit
            </Button>
            <Button
              danger
              style={{ marginLeft: 10 }}
              onClick={() => deleteContacts(name)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {open && (
        <ModalUser
          updateContacts={updateContacts}
          createContacts={createContacts}
          contacts={contacts}
          updateOpen={setOpen}
          info={info}
          action={ModalAction.Edit}
        />
      )}
    </div>
  );
};

export default UsersList;
