import { createEffect, createEvent } from "effector";

export const changeOpen = createEvent<boolean>();
export const updateSearch = createEvent<UserData[]>();

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
