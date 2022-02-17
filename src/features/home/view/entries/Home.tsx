import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useStore } from "effector-react";
import { ModalAction } from "src/types";
import { $open, setShowModal } from "../../model/private";
import { Contacts, ModalUser, Search } from "../containers";

export const Home: React.FC = () => {
  const open = useStore($open);

  return (
    <Wrapper>
      <Search />
      <ButtonWithMargin onClick={() => setShowModal(!open)}>
        Create Modal
      </ButtonWithMargin>
      <Contacts />

      {open && <ModalUser action={ModalAction.Create} />}
    </Wrapper>
  );
};

const ButtonWithMargin = styled(Button)`
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  min-width: 800px;
  margin: 20px auto;
  padding: 10px 170px;

  @media (max-width: 800px) {
    padding: 10px;
  }
`;
