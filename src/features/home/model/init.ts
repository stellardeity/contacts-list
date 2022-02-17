import { sample } from "effector";
import {
  $contacts,
  $open,
  changeContact,
  insertContact,
  removeContact,
} from "./public";
import { setShowModal, getContactsList, saveContact } from "./private";

$open.on(setShowModal, (_, value) => value);

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
