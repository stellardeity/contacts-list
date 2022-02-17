import { sample } from "effector";
import { createForm } from "effector-forms";
import { createEmptyUserDataList } from "src/lib/empty-userdata";
import { UserDataFields } from "src/lib/form-userdata";
import {
  $contacts,
  $editContactData,
  $open,
  $search,
  changeContact,
  changeSearch,
  insertContact,
  removeContact,
  reset,
  setEditContactData,
  setShowModal,
} from "./private";
import { getContactsList, saveContact } from "./private";

$open.on(setShowModal, (_, value) => value);
$search.on(changeSearch, (_, value) => value);

$editContactData.on(setEditContactData, (_, value) => value);

$contacts
  .on(insertContact, (contacts: UserData[], contact: UserData) => [
    ...contacts,
    contact,
  ])
  .on(removeContact, (contacts: UserData[], name: string) =>
    contacts.filter((e) => e.name !== name)
  )
  .on(
    changeContact,
    (contacts: UserData[], { name, phone, key }: UserData & { key: string }) =>
      contacts.map((e: UserData) => {
        if (e.name === key) {
          e.name = name;
          e.phone = phone;
        }
        return e;
      })
  )
  .on(getContactsList.done, (_, { result }) => result)
  .on(getContactsList.fail, () => [])
  .on(reset, () => createEmptyUserDataList());

export const UserDataForm = createForm(UserDataFields);

sample({
  clock: $contacts,
  target: saveContact,
});
getContactsList();
