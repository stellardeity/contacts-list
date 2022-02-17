import React from "react";
import { ModalAction } from "src/types";
import { ContactComponent } from "../parts/Contact";
import { useStore } from "effector-react";
import { $contacts, $open } from "src/features/home/model/private";
import { $filteredContacts } from "../../model/init";
import { ModalUser } from "./Modal";

export const Contacts: React.FC = () => {
  const open = useStore($open);
  const search = useStore($filteredContacts);
  const contacts = useStore($contacts);

  return (
    <div>
      {search.length ? (
        <h2>Найдено контактов {search.length}</h2>
      ) : (
        <h2>Общее количество контактов {contacts.length}</h2>
      )}
      {search.map((data, i) => (
        <div key={data.name + data.phone}>
          <ContactComponent border={search.length - 1 === i} data={data} />
          {open && <ModalUser contact={data} action={ModalAction.Edit} />}
        </div>
      ))}
    </div>
  );
};
