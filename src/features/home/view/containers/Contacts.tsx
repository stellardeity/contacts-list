import React from "react";
import { ModalAction } from "src/types";
import { Contact } from "../parts/Contact";
import { useStore } from "effector-react";
import {
  $contacts,
  $filteredContacts,
  openModal,
} from "src/features/home/model/private";

export const Contacts: React.FC = () => {
  const search = useStore($filteredContacts);
  const contacts = useStore($contacts);

  const changeEditData = (data: UserData) => {
    openModal({ type: ModalAction.Edit, name: data.name });
  };

  return (
    <div>
      {search.length ? (
        <h2>Найдено контактов {search.length}</h2>
      ) : (
        <h2>Общее количество контактов {contacts.length}</h2>
      )}
      {search.map((data, i) => (
        <div key={data.name + data.phone}>
          <Contact
            handleEditData={changeEditData}
            border={search.length - 1 === i}
            data={data}
          />
        </div>
      ))}
    </div>
  );
};
