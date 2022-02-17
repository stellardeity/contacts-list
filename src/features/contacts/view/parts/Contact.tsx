import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { removeContact } from "src/features/home/model/public";
import { setShowModal } from "src/features/home/model/private";

type Props = {
  border: boolean;
  data: UserData;
};

export const ContactComponent: React.FC<Props> = ({
  border,
  data: { phone, name },
}) => (
  <Contact border={border} key={name}>
    <div>
      <h3>{name}</h3>
      <p>{phone}</p>
    </div>
    <div>
      <Button onClick={() => setShowModal(true)}>Edit</Button>
      <ButtonWithMargin danger style={{}} onClick={() => removeContact(name)}>
        Delete
      </ButtonWithMargin>
    </div>
  </Contact>
);

const Contact = styled.div<{ border: boolean }>`
  margin-top: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => (props.border ? "none" : "1px solid #e2e2e2")};
`;

const ButtonWithMargin = styled(Button)`
  margin-left: 10px;
`;
