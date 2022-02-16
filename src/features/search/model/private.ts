import { createEvent, createStore, sample } from "effector";

export const change = createEvent<string>();
const reset = createEvent();
const insert = createEvent();

export const $input = createStore("")
  .on(change, (_, value) => value)
  .reset(reset, insert);

const submit = createEvent();
submit.watch((event: any) => event.preventDefault());

sample({
  clock: submit,
  source: $input,
  target: insert,
});
