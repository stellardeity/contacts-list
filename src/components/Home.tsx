import { useState } from "react";
import { Button } from "antd";
import ModalUser from "./Modal";
import UsersList from "./Contacts";
import Search from "./Search";
import { ModalAction } from "../types";
import styled from "styled-components";
import { useStore } from "effector-react";
import { $contacts } from "../effector";

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const contacts = useStore($contacts);
  const [search, setSearch] = useState<UserData[] | null>(null);

  return (
    <Wrapper>
      <Search contacts={contacts} search={search} updateSearch={setSearch} />
      <Button style={{ marginBottom: "30px" }} onClick={() => setOpen(!open)}>
        Create Modal
      </Button>
      <UsersList
        contacts={contacts}
        search={search}
        updateSearch={setSearch}
        updateOpen={setOpen}
      />

      {open && (
        <ModalUser
          callback={() => {}}
          updateOpen={setOpen}
          action={ModalAction.Create}
        />
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

export default Home;
