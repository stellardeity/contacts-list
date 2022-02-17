import { combine, createEffect, createStore, forward, sample } from "effector";
import { createForm } from "effector-forms";
import {
  $contacts,
  $open,
  $search,
  changeContact,
  changeSearch,
  insertContact,
  removeContact,
  reset,
  updateData,
} from "./private";
import { setShowModal, getContactsList, saveContact } from "./private";

export const $data = createStore({ name: "", phone: "" }).on(
  updateData,
  (_, value) => value
);

$open.on(setShowModal, (_, value) => value);
$search.on(changeSearch, (_, value) => value);

export const $filteredContacts = combine(
  $contacts,
  $search,
  (contacts, value) => {
    const pattern = new RegExp(value, "gi");
    return contacts.filter(
      (e) => e.phone.match(pattern) || e.name.match(pattern)
    );
  }
);

$contacts
  .on(insertContact, (contacts: UserData[], newContact: UserData) => [
    ...contacts,
    newContact,
  ])
  .on(removeContact, (contacts: UserData[], name: string) =>
    contacts.filter((e) => e.name !== name)
  )
  .on(
    changeContact,
    (contacts: UserData[], { name, phone, key }: UserData & { key: string }) =>
      contacts.map((e: UserData) => {
        if (e.name === key) {
          e.name = name;
          e.phone = phone;
        }
        return e;
      })
  )
  .on(getContactsList.done, (_, { result }) => result)
  .on(reset, () => createEmptyUserData())
  .on(getContactsList.fail, () => []);

getContactsList();

sample({
  clock: $contacts,
  target: saveContact,
});
function createEmptyUserData(): void | UserData[] {
  throw new Error("Function not implemented.");
}

// ===================================
export const loginForm = createForm({
  fields: {
    email: {
      init: "", // field's store initial value
      rules: [
        {
          name: "email",
          validator: (value: string) => /\S+@\S+\.\S+/.test(value),
        },
      ],
    },
    password: {
      init: "", // field's store initial value
      rules: [
        {
          name: "required",
          validator: (value: string) => Boolean(value),
        },
      ],
    },
  },
  validateOn: ["submit"],
});

export const loginFx = createEffect();

forward({
  from: loginForm.formValidated,
  to: loginFx,
});
