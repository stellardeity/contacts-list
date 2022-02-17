import { combine } from "effector";
import { $contacts } from "src/features/home/model";
import { $search, changeSearch } from "./init";

$search.on(changeSearch, (_, value) => value);

export const $filteredContacts = combine(
  $contacts,
  $search,
  (contacts, value) => {
    const pattern = new RegExp(value, "gi");
    return contacts.filter(
      (e) => e.phone.match(pattern) || e.name.match(pattern)
    );
  }
);
