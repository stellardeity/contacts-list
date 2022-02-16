import React, { useEffect } from "react";
import { Input } from "antd";
import { change } from "../../model/private";
import { useStore } from "effector-react";
import { $input } from "../../model/init";

type Props = {
  contacts: UserData[];
  search: UserData[] | null;
  updateSearch: (val: UserData[]) => void;
};

export const Search: React.FC<Props> = ({ contacts, search, updateSearch }) => {
  const value = useStore($input);

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(value, "gi");
    updateSearch(
      contacts.filter((e) => e.phone.match(pattern) || e.name.match(pattern))
    );

    change(value);
  };

  useEffect(() => {
    if (!search) {
      change("");
    }
  }, [contacts]);

  return (
    <Input
      style={{ marginBottom: "15px" }}
      onChange={handleSearch}
      placeholder="Поиск"
      value={value}
    />
  );
};
