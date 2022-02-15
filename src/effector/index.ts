import { createEvent, createStore } from "effector";

export const remove = createEvent<string>();
export const change = createEvent();
export const post = createEvent<UserData[]>();
export const insert = createEvent<UserData>();

export const $contacts = createStore<UserData[]>([])
  .on(insert, (contacts: UserData[], newContact: UserData) => [
    ...contacts,
    newContact,
  ])
  .on(post, (contacts: UserData[], newContacts: UserData[]) => [
    ...contacts,
    ...newContacts,
  ])
  .on(remove, (contacts: UserData[], index: string) =>
    contacts.filter((e, i) => e.name !== index)
  );

