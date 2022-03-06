import { forward, guard, sample } from "effector";
import { createEmptyUserDataList } from "src/lib/empty-userdata";
import * as store from "./private";

store.$search.on(store.changeSearch, (_, value) => value);

store.$open.on(store.openModal, () => true).reset(store.closeModal);
store.$modalType
  .on(store.openModal, (_, value) => value.type)
  .reset(store.closeModal);

store.$oldName.on(store.openModal, (_, value) => value.name);

store.$contacts
  .on(store.insertContact, (contacts: UserData[], contact: UserData) => [
    ...contacts,
    contact,
  ])
  .on(store.removeContact, (contacts: UserData[], name: string) =>
    contacts.filter((e) => e.name !== name)
  )
  .on(
    store.changeContact,
    (contacts: UserData[], { name, phone, key }: UserData & { key: string }) =>
      contacts.map((e: UserData) => {
        if (e.name === key) {
          e.name = name;
          e.phone = phone;
        }
        return e;
      })
  )
  .on(store.getContactsListFx.done, (_, { result }) => result)
  .on(store.getContactsListFx.fail, () => [])
  .on(store.reset, () => createEmptyUserDataList());

// save on localStorage
sample({
  clock: store.$contacts,
  target: store.saveContactFx,
});

// set form on contact edit
sample({
  source: store.$contacts,
  clock: guard({
    clock: store.openModal,
    filter: (e) => !!e.name,
  }),
  fn: (s, c) => s.find((e) => c.name === e.name) as UserData,
  target: store.userDataForm.setForm,
});

// changing fields
forward({
  from: store.modalTypeSplit.create.map((e) => e.form),
  to: store.insertContact,
});

sample({
  source: store.$oldName,
  clock: store.modalTypeSplit.edit,
  fn: (s, c) => ({ name: c.form.name, phone: c.form.phone, key: s }),
  target: store.changeContact,
});

// close modal
forward({
  from: store.closeModal,
  to: store.userDataForm.reset,
});

sample({
  clock: store.userDataForm.formValidated,
  target: store.closeModal,
});

// ===========
store.getContactsListFx.use(() => {
  return JSON.parse(localStorage.getItem("userData") || "[]");
});

store.saveContactFx.use((params: UserData[]) => {
  localStorage.setItem("userData", JSON.stringify(params));
});

store.getContactsListFx();
