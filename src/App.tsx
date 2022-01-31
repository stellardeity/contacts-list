import { Button, Cascader, Input, Select } from "antd";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import CreateUser from "./components/Modal/CreateUser";
import UsersList from "./components/UsersList";
import { ModalAction, UserData } from "./types";

const App = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<any>(null);
  const [data, setData] = useState<UserData[]>(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || "")
      : []
  );

  const onSearch = ({ target: { value } }: any) => {
    setSearch(data.filter((e) => e.phone.match(value) || e.name.match(value)));

    if (!value) {
      setSearch("");
    }
  };

  return (
    <div
      style={{
        minWidth: 800,
        margin: "20px auto",
        padding: "10px 170px",
      }}
    >
      <Input
        style={{ marginBottom: "20px" }}
        onChange={onSearch}
        placeholder="Поиск"
      />

      <Button onClick={() => setOpen(!open)}>Create Modal</Button>
      <UsersList
        data={search || data}
        updateData={setData}
        updateOpen={setOpen}
      />

      {open && (
        <CreateUser
          updateOpen={setOpen}
          data={data}
          updateData={setData}
          action={ModalAction.Create}
        />
      )}
    </div>
  );
};
export default App;
