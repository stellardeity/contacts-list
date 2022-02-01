import { UserData } from "../types";

export const updateContacts = (payload: UserData & { key: string }) => ({
  type: "contacts/UPDATE_CONTACTS",
  payload,
});

export const deleteContacts = (name: UserData["name"]) => ({
  type: "contacts/DELETE_CONTACTS",
  payload: name,
});

export const createContacts = (payload: UserData) => ({
  type: "contacts/CREATE_CONTACTS",
  payload,
});

export const fetchContacts = (payload: UserData[]) => ({
  type: "contacts/FETCH_CONTACTS",
  payload,
});
