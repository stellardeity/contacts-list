import { createEffect, createEvent, createStore, sample } from "effector";
import connectLocalStorage from "effector-localstorage";

export const remove = createEvent<string>();
export const change = createEvent<UserData & { key: string }>();
export const insert = createEvent<UserData>();
const saveContact = createEffect((params: UserData[]) => {
  localStorage.setItem("userData", JSON.stringify(params));
});

const counterLocalStorage = connectLocalStorage("userData").onError(
  (err: string) => console.log(err)
);

export const $contacts = createStore<UserData[]>(
  counterLocalStorage.init(0) || []
)
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
  );

sample({
  clock: $contacts,
  target: saveContact,
});
