import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useStore } from "effector-react";
import { Search } from "src/features/search/view";
import { UsersList } from "src/features/contacts/view/entries";
import { ModalUser } from "src/features/modal/view";
import { ModalAction } from "src/types";
import { changeOpen, updateSearch } from "../../model/private";
import { $contacts, $open, $search } from "../../model/init";

export const Home: React.FC = () => {
  const open = useStore($open);
  const search = useStore($search);
  const contacts = useStore($contacts);

  return (
    <Wrapper>
      <Search contacts={contacts} search={search} updateSearch={updateSearch} />
      <Button
        style={{ marginBottom: "30px" }}
        onClick={() => changeOpen(!open)}
      >
        Create Modal
      </Button>
      <UsersList
        contacts={contacts}
        search={search}
        updateSearch={updateSearch}
        updateOpen={changeOpen}
      />

      {open && (
        <ModalUser updateOpen={changeOpen} action={ModalAction.Create} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 800;
  margin: 20px auto;
  padding: 10px 170px;

  @media (max-width: 800px) {
    padding: 10px;
  }
`;
