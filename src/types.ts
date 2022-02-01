import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "./redux/actions";

export enum ModalAction {
  Create = "Create",
  Edit = "Edit",
}

export type ContactsDispatch = ReturnType<
  | typeof createContact
  | typeof deleteContact
  | typeof fetchContacts
  | typeof updateContact
>;
