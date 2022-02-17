import { combine, createStore, sample } from "effector";
import {
  $contacts,
  $error,
  $open,
  $search,
  changeContact,
  changeError,
  changeSearch,
  insertContact,
  removeContact,
  reset,
  updateData,
} from "./private";
import { setShowModal, getContactsList, saveContact } from "./private";

$error.on(changeError, (_, value) => value);
export const $data = createStore({ name: "", phone: "" }).on(
  updateData,
  (_, value) => value
);

$open.on(setShowModal, (_, value) => value);
$search.on(changeSearch, (_, value) => value);

export const $filteredContacts = combine(
  $contacts,
  $search,
  (contacts, value) => {
    const pattern = new RegExp(value, "gi");
    return contacts.filter(
      (e) => e.phone.match(pattern) || e.name.match(pattern)
    );
  }
);

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
  .on(reset, () => createEmptyUserData())
  .on(getContactsList.fail, () => []);

getContactsList();

sample({
  clock: $contacts,
  target: saveContact,
});
function createEmptyUserData(): void | UserData[] {
  throw new Error("Function not implemented.");
}
