import { createEvent } from "effector";

export const changeError = createEvent<string>();
export const updateData = createEvent<UserData>();
