import { createEvent } from "effector";

export const change = createEvent<string>();
export const reset = createEvent();
export const insert = createEvent();

export const submit = createEvent();
submit.watch((event: any) => event.preventDefault());
