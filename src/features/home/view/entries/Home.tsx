import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useStore } from "effector-react";
import { UsersList } from "src/features/contacts/view/entries";
import { ModalUser } from "src/features/modal/view";
import { ModalAction } from "src/types";
import { setShowModal } from "../../model/private";
import { Search } from "src/features/search/view";
import { $open } from "../../model";

export const Home: React.FC = () => {
  const open = useStore($open);

  return (
    <Wrapper>
      <Search />
      <ButtonWithMargin onClick={() => setShowModal(!open)}>
        Create Modal
      </ButtonWithMargin>
      <UsersList />

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
