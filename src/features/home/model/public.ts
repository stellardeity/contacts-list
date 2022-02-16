import { createEvent } from "effector";

export const remove = createEvent<string>();
export const change = createEvent<UserData & { key: string }>();
export const insert = createEvent<UserData>();
