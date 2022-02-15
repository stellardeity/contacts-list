import React, { useMemo } from "react";
import { ModalAction } from "src/types";
import { ContactComponent } from "../parts/Contact";
import { ModalUser } from "src/features/modal/view";
import { $info, $open, changeOpen, setInfo } from "../../model/private";
import { useStore } from "effector-react";

type Props = {
  search: UserData[];
  contacts: UserData[];
  updateOpen: (val: boolean) => void;
  updateSearch: (val: UserData[]) => void;
};

export const UsersList: React.FC<Props> = ({ search, contacts }) => {
  const open = useStore($open);
  const info = useStore($info);
  const list = useMemo(
    () => (search.length ? search : contacts),
    [contacts, search]
  );

  return (
    <div>
      {search.length && search.length !== contacts.length ? (
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
          updateOpen={changeOpen}
        />
      ))}

      {open && (
        <ModalUser
          updateOpen={changeOpen}
          info={info}
          action={ModalAction.Edit}
        />
      )}
    </div>
  );
};
