import { createEvent, createStore } from "effector";

export const changeOpen = createEvent<boolean>();
export const setInfo = createEvent<UserData>();

export const $open = createStore(false).on(changeOpen, (_, value) => value);
export const $info = createStore({} as UserData).on(
  setInfo,
  (_, value) => value
);
