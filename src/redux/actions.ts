import { UserData } from "../types";
import TYPES from "./actionTypes";

export const updateContacts = (payload: UserData & { key: string }) => ({
  type: TYPES.UPDATE_CONTACTS,
  payload,
});

export const deleteContacts = (name: UserData["name"]) => ({
  type: TYPES.DELETE_CONTACTS,
  payload: name,
});

export const createContacts = (payload: UserData) => ({
  type: TYPES.CREATE_CONTACTS,
  payload,
});

export const fetchContacts = (payload: UserData[]) => ({
  type: TYPES.FETCH_CONTACTS,
  payload,
});
