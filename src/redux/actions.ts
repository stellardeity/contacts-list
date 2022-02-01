import { UserData } from "../types";
import TYPES from "./actionTypes";

export const updateContact = (
  payload: UserData & { key: UserData["name"] }
) => ({
  type: TYPES.UPDATE_CONTACT,
  payload,
});

export const deleteContact = (name: UserData["name"]) => ({
  type: TYPES.DELETE_CONTACT,
  payload: name,
});

export const createContact = (payload: UserData) => ({
  type: TYPES.CREATE_CONTACT,
  payload,
});

export const fetchContacts = (payload: UserData[]) => ({
  type: TYPES.FETCH_CONTACTS,
  payload,
});
