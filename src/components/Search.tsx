import { Input } from "antd";
import React from "react";

type Props = {
  contacts: UserData[];
  updateSearch: (val: UserData[]) => void;
};

const Search: React.FC<Props> = ({ contacts, updateSearch }) => {
  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(value, "gi");
    updateSearch(
      contacts.filter((e) => e.phone.match(pattern) || e.name.match(pattern))
    );
  };

  return (
    <Input
      style={{ marginBottom: "15px" }}
      onChange={handleSearch}
      placeholder="Поиск"
    />
  );
};

export default Search;
