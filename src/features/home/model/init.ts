import { createStore, sample } from "effector";
import { changeContact, insertContact, removeContact } from "./public";
import { setShowModal, getContactsList, saveContact } from "./private";

export const $open = createStore(false).on(setShowModal, (_, value) => value);

export const $contacts = createStore<UserData[]>([])
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
          e.name = name || "";
          e.phone = phone || "";
        }
        return e;
      })
  )
  .on(getContactsList.done, (_, { result }) => result)
  .on(getContactsList.fail, () => []);

getContactsList();

sample({
  clock: $contacts,
  target: saveContact,
});
