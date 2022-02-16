import { createStore, sample } from "effector";
import { change, insert, remove } from "./public";
import {
  changeOpen,
  getContactsList,
  saveContact,
  updateSearch,
} from "./private";

export const $open = createStore(false).on(changeOpen, (_, value) => value);
export const $search = createStore([] as UserData[]).on(
  updateSearch,
  (_, value) => value
);

export const $contacts = createStore<UserData[]>([])
  .on(insert, (contacts: UserData[], newContact: UserData) => [
    ...contacts,
    newContact,
  ])
  .on(remove, (contacts: UserData[], name: string) =>
    contacts.filter((e) => e.name !== name)
  )
  .on(
    change,
    (contacts: UserData[], { name, phone, key }: UserData & { key: string }) =>
      contacts.map((e: UserData) => {
        if (e.name === key) {
          e.name = name || "";
          e.phone = phone || "";
          return e;
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
