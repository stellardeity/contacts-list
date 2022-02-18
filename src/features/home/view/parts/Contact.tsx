import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { removeContact } from "src/features/home/model/private";

type Props = {
  border: boolean;
  data: UserData;
  handleEditData: (val: UserData) => void;
};

export const Contact: React.FC<Props> = ({
  border,
  data: { phone, name },
  handleEditData,
}) => (
  <WrapperContact border={border} key={name}>
    <div>
      <h3>{name}</h3>
      <p>{phone}</p>
    </div>
    <div>
      <Button onClick={() => handleEditData({ phone, name })}>Edit</Button>
      <ButtonWithMargin danger onClick={() => removeContact(name)}>
        Delete
      </ButtonWithMargin>
    </div>
  </WrapperContact>
);

const WrapperContact = styled.div<{ border: boolean }>`
  margin-top: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => (props.border ? "none" : "1px solid #e2e2e2")};
`;

const ButtonWithMargin = styled(Button)`
  margin-left: 10px;
`;
