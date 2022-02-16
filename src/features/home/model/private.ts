import { createEvent, createStore } from "effector";

export const changeOpen = createEvent<boolean>();
export const updateSearch = createEvent<UserData[]>();

export const $open = createStore(false).on(changeOpen, (_, value) => value);
export const $search = createStore([] as UserData[]).on(
  updateSearch,
  (_, value) => value
);
