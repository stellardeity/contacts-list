import { createEvent, createStore } from "effector";

export const changeError = createEvent<string>();
export const updateData = createEvent<UserData>();

export const $error = createStore("");
