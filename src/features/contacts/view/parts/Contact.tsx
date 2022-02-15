import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { remove } from "src/features/home/model/public";

type Props = {
  border: string;
  data: UserData;
  updateOpen: (val: boolean) => void;
  updateInfo: (val: UserData) => void;
};

export const ContactComponent: React.FC<Props> = ({
  border,
  data: { phone, name },
  updateInfo,
  updateOpen,
}) => {
  const handleEditData = ({ name, phone }: UserData) => {
    updateOpen(true);
    updateInfo({ name, phone });
  };

  return (
    <Contact
      style={{
        borderBottom: border,
      }}
      key={name}
    >
      <div>
        <h3>{name}</h3>
        <p>{phone}</p>
      </div>
      <div>
        <Button onClick={() => handleEditData({ name, phone })}>Edit</Button>
        <Button danger style={{ marginLeft: 10 }} onClick={() => remove(name)}>
          Delete
        </Button>
      </div>
    </Contact>
  );
};

const Contact = styled.div`
  margin-top: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
