import { sample } from "effector";
import { createForm } from "effector-forms";
import { createEmptyUserDataList } from "src/lib/empty-userdata";
import { UserDataFields } from "src/lib/form-userdata";
import * as store from "./private";
import { getContactsList, saveContact } from "./private";

store.$open.on(store.setShowModal, (_, value) => value);
store.$search.on(store.changeSearch, (_, value) => value);
store.$error.on(store.changeError, (_, value) => value);

store.$editContactData.on(store.setEditContactData, (_, value) => value);

store.$contacts
  .on(store.insertContact, (contacts: UserData[], contact: UserData) => [
    ...contacts,
    contact,
  ])
  .on(store.removeContact, (contacts: UserData[], name: string) =>
    contacts.filter((e) => e.name !== name)
  )
  .on(
    store.changeContact,
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
  .on(store.reset, () => createEmptyUserDataList());

export const UserDataForm = createForm(UserDataFields);

sample({
  clock: store.$contacts,
  target: saveContact,
});
getContactsList();
