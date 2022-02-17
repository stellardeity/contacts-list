import { createEvent, createStore } from "effector";

export const removeContact = createEvent<string>();
export const changeContact = createEvent<UserData & { key: string }>();
export const insertContact = createEvent<UserData>();

export const $contacts = createStore<UserData[]>([]);
export const $open = createStore(false);
