import { combine, sample } from "effector";
import { createForm } from "effector-forms";
import { createEmptyUserDataArr } from "src/lib/empty-userdata";
import {
  $contacts,
  $editContactData,
  $openCreate,
  $openEdit,
  $search,
  changeContact,
  changeSearch,
  insertContact,
  removeContact,
  reset,
  setEditContactData,
  setShowModalCreate,
  setShowModalEdit,
} from "./private";
import { getContactsList, saveContact } from "./private";

$openCreate.on(setShowModalCreate, (_, value) => value);
$openEdit.on(setShowModalEdit, (_, value) => value);
$search.on(changeSearch, (_, value) => value);

$editContactData.on(setEditContactData, (_, value) => value);

$contacts
  .on(insertContact, (contacts: UserData[], newContact: UserData) => [
    ...contacts,
    newContact,
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
  .on(reset, () => createEmptyUserDataArr())
  .on(getContactsList.fail, () => []);

sample({
  clock: $contacts,
  target: saveContact,
});

export const UserDataForm = createForm({
  fields: {
    name: { init: "" },
    phone: { init: "" },
  },
});

getContactsList();
