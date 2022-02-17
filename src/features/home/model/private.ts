import { createEffect, createEvent } from "effector";

export const setShowModal = createEvent<boolean>();

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
