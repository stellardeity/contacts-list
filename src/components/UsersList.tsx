import { Button } from "antd";
import { useEffect, useState } from "react";
import { ModalAction, UserData } from "../types";
import CreateUser from "./Modal/CreateUser";

type Props = {
  data: UserData[];
  updateData: (val: UserData[]) => void;
  updateOpen: (val: boolean) => void;
};

const UsersList: React.FC<Props> = ({ data, updateData }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<UserData | null>(null);

  const handleEditData = ({ name, phone }: UserData) => {
    setOpen(true);
    setInfo({ name, phone });
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <h2>Общее количество контактов {data.length}</h2>
      {data.map(({ name, phone }, i) => (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: data.length - 1 === i ? "none" : "2px solid #222",
          }}
          key={phone}
        >
          <div>
            <h3>{name}</h3>
            <p>{phone}</p>
          </div>
          <div>
            <Button
              onClick={() => {
                const res = data.filter((e: UserData) => e.name !== name);
                updateData(res);
              }}
            >
              Delete
            </Button>
            <Button onClick={() => handleEditData({ name, phone })}>
              Edit
            </Button>
          </div>
        </div>
      ))}

      {open && (
        <CreateUser
          updateOpen={setOpen}
          data={data}
          info={info}
          updateData={updateData}
          action={ModalAction.Edit}
        />
      )}
    </div>
  );
};
export default UsersList;
