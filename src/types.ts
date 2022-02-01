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
  type: "contacts/DELETE_CONTACTS";
  payload: string;
}

interface IUpdateContacts {
  type: "contacts/UPDATE_CONTACTS";
  payload: UserData & { key: string };
}

interface ICreateContacts {
  type: "contacts/CREATE_CONTACTS";
  payload: UserData;
}

interface IFetchContacts {
  type: "contacts/FETCH_CONTACTS";
  payload: UserData[];
}

export type ContactsAction =
  | IDeleteContacts
  | IUpdateContacts
  | ICreateContacts
  | IFetchContacts;
