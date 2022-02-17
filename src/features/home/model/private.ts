import { combine, createEffect, createEvent, createStore } from "effector";
import {
  createEmptyUserData,
  createEmptyUserDataList,
} from "src/lib/empty-userdata";
import { ModalAction } from "src/types";

export const removeContact = createEvent<string>();
export const changeContact = createEvent<UserData & { key: string }>();
export const insertContact = createEvent<UserData>();
export const changeSearch = createEvent<string>();
export const setShowModal = createEvent<ModalAction | null>();
export const setEditContactData = createEvent<UserData>();
export const changeError = createEvent<string>("");

export const reset = createEvent();

export const $open = createStore<ModalAction | null>(null);
export const $search = createStore<string>("");

export const $error = createStore<string>("");

export const $editContactData = createStore<UserData>(createEmptyUserData());

export const $contacts = createStore<UserData[]>(createEmptyUserDataList());

export const saveContact = createEffect((params: UserData[]) => {
  localStorage.setItem("userData", JSON.stringify(params));
});
export const getContactsList = createEffect(() => {
  try {
    return JSON.parse(localStorage.getItem("userData") || "[]");
  } catch (e) {
    throw e;
  }
});

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

export const changeUserData = createEffect(
  ({
    data,
    action,
    contact,
  }: {
    data: UserData;
    action: ModalAction;
    contact?: UserData;
  }) => {
    if (action === ModalAction.Edit && contact) {
      changeContact({
        key: contact?.name,
        name: data.name,
        phone: data.phone,
      });
    } else {
      insertContact(data);
    }
  }
);
