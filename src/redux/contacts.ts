import { ContactsAction, UserData } from "../types";
import TYPES from "./actionTypes";

const initialState: UserData[] = [];

export function contactsReducer(
  state: UserData[] = initialState,
  action: ContactsAction
) {
  switch (action.type) {
    case TYPES.DELETE_CONTACTS:
      return state.filter((e) => e.name !== action.payload);
    case TYPES.UPDATE_CONTACTS:
      const { key, name, phone } = action.payload;
      return state.map((e: UserData) => {
        if (e.name === key) {
          e.name = name || "";
          e.phone = phone || "";
          return e;
        }
        return e;
      });
    case TYPES.CREATE_CONTACTS:
      return [action.payload, ...state];
    case TYPES.FETCH_CONTACTS:
      return action.payload;
    default:
      return state;
  }
}
