import { combine, createEffect, createEvent, createStore, sample, split } from "effector";
import { createForm } from "effector-forms";
import {
  createEmptyUserData,
  createEmptyUserDataList,
} from "src/lib/empty-userdata";
import { required } from "src/lib/validation-rules";
import { ModalAction } from "src/types";

export const $contacts = createStore<UserData[]>(createEmptyUserDataList());
export const removeContact = createEvent<string>();
export const changeContact = createEvent<UserData & { key: string }>();
export const insertContact = createEvent<UserData>();

export const $oldName = createStore<string>("")

export const $search = createStore("");
export const changeSearch = createEvent<string>();

export const reset = createEvent();

export const openModal = createEvent<{ type: ModalAction; name?: string }>();
export const closeModal = createEvent();
export const $open = createStore<boolean>(false);

export const $modalType = createStore<ModalAction | null>(null);

export const saveContactFx = createEffect<UserData[], void, Error>();
export const getContactsListFx = createEffect<void, UserData[], Error>();

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

export const userDataForm = createForm({
  fields: {
    name: { init: "", rules: [required()] },
    phone: { init: "", rules: [required()] },
  },
});

export const modalTypeSplit = split(
  sample({
    source: $modalType,
    clock: userDataForm.formValidated,
    fn: (type, form) => ({ type, form })
  }), {
  create: (t) => t.type === ModalAction.Create,
  edit: (t) => t.type === ModalAction.Edit
}
)