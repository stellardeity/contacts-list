import React from "react";
import { Input } from "antd";
import { useStore } from "effector-react";
import { $search, changeSearch } from "../../model/init";

export const Search: React.FC = () => {
  const value = useStore($search);

  return (
    <Input
      style={{ marginBottom: "15px" }}
      onChange={({ target }) => changeSearch(target.value)}
      placeholder="Поиск"
      value={value}
    />
  );
};
