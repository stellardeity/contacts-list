import { createStore } from "effector";
import { changeOpen, setInfo } from "./private";

export const $open = createStore(false).on(changeOpen, (_, value) => value);
export const $info = createStore({} as UserData).on(
  setInfo,
  (_, value) => value
);
