import { createEvent, createStore } from "effector";

export const changeSearch = createEvent<string>();
export const $search = createStore("");
