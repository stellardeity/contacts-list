import { useMemo, useState } from "react";
import { ModalAction } from "../types";
import ModalUser from "./Modal";
import ContactComponent from "./Contact";

type Props = {
  search: UserData[] | null;
  contacts: UserData[];
  updateOpen: (val: boolean) => void;
  updateSearch: (val: UserData[] | null) => void;
};

const UsersList: React.FC<Props> = ({ search, contacts }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<UserData | null>(null);
  const list = useMemo(() => search || contacts, [contacts, search]);

  return (
    <div>
      {search && search.length !== contacts.length ? (
        <h2>Найдено контактов {search.length}</h2>
      ) : (
        <h2>Общее количество контактов {contacts.length}</h2>
      )}
      {list.map((data, i) => (
        <ContactComponent
          key={i}
          border={list.length - 1 === i ? "none" : "1px solid #e2e2e2"}
          data={data}
          updateInfo={setInfo}
          updateOpen={setOpen}
        />
      ))}

      {open && (
        <ModalUser
          callback={() => {}}
          updateOpen={setOpen}
          info={info}
          action={ModalAction.Edit}
        />
      )}
    </div>
  );
};

export default UsersList;
