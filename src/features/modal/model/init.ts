import { createStore } from "effector";
import { createForm } from "effector-forms";
import { changeError, updateData } from "./private";

export const $error = createStore("").on(changeError, (_, value) => value);
export const $data = createStore({ name: "", phone: "" }).on(
  updateData,
  (_, value) => value
);

// ==============================================
const test = createForm({ fields: { name: { init: "" } } });
// export const loginForm = createForm({
//   fields: {
//     email: {
//       init: "", // field's store initial value
//       rules: [
//         {
//           name: "email",
//           validator: (value: string) => /\S+@\S+\.\S+/.test(value),
//         },
//       ],
//     },
//     password: {
//       init: "", // field's store initial value
//       rules: [
//         {
//           name: "required",
//           validator: (value: string) => Boolean(value),
//         },
//       ],
//     },
//   },
//   validateOn: ["submit"],
// });

// export const loginFx = createEffect();

// forward({
//   from: loginForm.formValidated,
//   to: loginFx,
// });
