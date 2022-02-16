import { createEvent, createStore } from "effector";

export const changeError = createEvent<string>();
export const updateData = createEvent<UserData>();

export const $error = createStore("").on(changeError, (_, value) => value);
export const $data = createStore({ name: "", phone: "" }).on(
  updateData,
  (_, value) => value
);
