import { createStore, sample } from "effector";
import { change, insert, reset, submit } from "./private";

export const $input = createStore("")
  .on(change, (_, value) => value)
  .reset(reset, insert);

sample({
  clock: submit,
  source: $input,
  target: insert,
});
