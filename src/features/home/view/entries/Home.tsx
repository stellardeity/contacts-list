import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useStore } from "effector-react";
import { ModalAction } from "src/types";
import { Contacts, ModalUser, Search } from "../containers";
import { $open, openModal } from "../../model/private";

export const Home: React.FC = () => {
  const open = useStore($open);

  return (
    <Wrapper>
      <Search />
      <ButtonWithMargin
        onClick={() => {
          openModal({ type: ModalAction.Create });
        }}
      >
        Create Modal
      </ButtonWithMargin>
      <Contacts />

      {open && <ModalUser />}
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
