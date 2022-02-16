import { createStore } from "effector";
import { changeError, updateData } from "./private";

export const $error = createStore("").on(changeError, (_, value) => value);
export const $data = createStore({ name: "", phone: "" }).on(
  updateData,
  (_, value) => value
);
