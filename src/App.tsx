import { Button, Input } from "antd";
import { useState } from "react";
import CreateUser from "./components/ModalUser";
import UsersList from "./components/UsersList";
import { ModalAction, UserData } from "./types";

const App = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<UserData[] | null>(null);
  const [data, setData] = useState<UserData[]>(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || "")
      : []
  );

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(value, "gi");
    setSearch(
      data.filter((e) => e.phone.match(pattern) || e.name.match(pattern))
    );
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
        style={{ marginBottom: "15px" }}
        onChange={handleSearch}
        placeholder="Поиск"
      />

      <Button style={{ marginBottom: "30px" }} onClick={() => setOpen(!open)}>
        Create Modal
      </Button>
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
