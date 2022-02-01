import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "./redux/actions";
import TYPES from "./redux/actionTypes";

export enum ModalAction {
  Create = "Create",
  Edit = "Edit",
}

// Redux
interface IDeleteContacts {
  type: typeof TYPES.DELETE_CONTACT;
  payload: string;
}

interface IUpdateContacts {
  type: typeof TYPES.UPDATE_CONTACT;
  payload: UserData & { key: string };
}

interface ICreateContacts {
  type: typeof TYPES.CREATE_CONTACT;
  payload: UserData;
}

interface IFetchContacts {
  type: typeof TYPES.FETCH_CONTACTS;
  payload: UserData[];
}

export type ContactsAction =
  | IDeleteContacts
  | IUpdateContacts
  | ICreateContacts
  | IFetchContacts;

export type ContactsDispatch = ReturnType<
  | typeof createContact
  | typeof deleteContact
  | typeof fetchContacts
  | typeof updateContact
>;
