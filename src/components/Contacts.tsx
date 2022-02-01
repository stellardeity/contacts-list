import { useMemo, useState } from "react";
import { Button } from "antd";
import { ModalAction } from "../types";
import ModalUser from "./Modal";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../redux/actions";
import styled from "styled-components";

type Props = {
  search: UserData[] | null;
  contacts: UserData[];
  updateOpen: (val: boolean) => void;
};

const UsersList: React.FC<Props> = ({ search, contacts }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [info, setInfo] = useState<UserData | null>(null);
  const list = useMemo(() => search || contacts, [contacts, search]);

  const handleEditData = ({ name, phone }: UserData) => {
    setOpen(true);
    setInfo({ name, phone });
  };

  return (
    <div>
      {search && search.length !== contacts.length ? (
        <h2>Найдено контактов {search.length}</h2>
      ) : (
        <h2>Общее количество контактов {contacts.length}</h2>
      )}
      {list.map(({ name, phone }, i) => (
        <Contact
          style={{
            borderBottom: list.length - 1 === i ? "none" : "1px solid #e2e2e2",
          }}
          key={name}
        >
          <div>
            <h3>{name}</h3>
            <p>{phone}</p>
          </div>
          <div>
            <Button onClick={() => handleEditData({ name, phone })}>
              Edit
            </Button>
            <Button
              danger
              style={{ marginLeft: 10 }}
              onClick={() => dispatch(deleteContact(name))}
            >
              Delete
            </Button>
          </div>
        </Contact>
      ))}

      {open && (
        <ModalUser
          callback={updateContact}
          updateOpen={setOpen}
          info={info}
          action={ModalAction.Edit}
        />
      )}
    </div>
  );
};

const Contact = styled.div`
  margin-top: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default UsersList;
