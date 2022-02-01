import {
  createContacts,
  deleteContacts,
  fetchContacts,
  updateContacts,
} from "./redux/actions";
import TYPES from "./redux/actionTypes";

export type UserData = {
  name: string;
  phone: string;
};

export enum ModalAction {
  Create = "Create",
  Edit = "Edit",
}

// Redux
interface IDeleteContacts {
  type: typeof TYPES.DELETE_CONTACTS;
  payload: string;
}

interface IUpdateContacts {
  type: typeof TYPES.UPDATE_CONTACTS;
  payload: UserData & { key: string };
}

interface ICreateContacts {
  type: typeof TYPES.CREATE_CONTACTS;
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
  | typeof createContacts
  | typeof deleteContacts
  | typeof fetchContacts
  | typeof updateContacts
>;
