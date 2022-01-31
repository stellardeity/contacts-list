import { Button } from "antd";
import { useState } from "react";
import { ModalAction, UserData } from "../types";
import CreateUser from "./Modal/CreateUser";

type Props = {
  data: UserData[];
  updateData: (d: any) => any;
  updateOpen: (a: any) => void;
};

const UsersList: React.FC<Props> = ({ data, updateData }) => {
  const [open, setOpen] = useState(false);
  const [info, setPhone] = useState<any>({});

  const handleEditData = ({ name, phone }: any) => {
    setOpen(true);
    setPhone({ name, phone });
  };

  return (
    <div>
      <h2>Общее количество контактов {data.length}</h2>
      {data.map(({ name, phone }) => (
        <div style={{ marginTop: 20 }} key={phone}>
          <h3>{name}</h3>
          <p>{phone}</p>
          <Button
            onClick={() =>
              updateData((prev: any) =>
                prev.filter((d: any) => d.name !== name)
              )
            }
          >
            Delete
          </Button>
          <Button onClick={() => handleEditData({ name, phone })}>Edit</Button>
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
