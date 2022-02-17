import { createEffect, createEvent, createStore } from "effector";

export const removeContact = createEvent<string>();
export const changeContact = createEvent<UserData & { key: string }>();
export const insertContact = createEvent<UserData>();
export const changeSearch = createEvent<string>();
export const changeError = createEvent<string>();
export const updateData = createEvent<UserData>();
export const setShowModal = createEvent<boolean>();

export const reset = createEvent();

export const $contacts = createStore<UserData[]>(createEmptyUserData());

export const $open = createStore(false);
export const $search = createStore("");

export const saveContact = createEffect((params: UserData[]) => {
  localStorage.setItem("userData", JSON.stringify(params));
});
export const getContactsList = createEffect(() => {
  try {
    return JSON.parse(localStorage.getItem("userData") || "{}");
  } catch (e) {
    throw e;
  }
});

function createEmptyUserData(): UserData[] {
  return [
    {
      name: "",
      phone: "",
    },
  ];
}
