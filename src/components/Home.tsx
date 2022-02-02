import { useState } from "react";
import { Button } from "antd";
import ModalUser from "./Modal";
import UsersList from "./Contacts";
import Search from "./Search";
import { ModalAction } from "../types";
import { useSelector } from "react-redux";
import { selectContacts } from "../redux/selectors";
import { createContact } from "../redux/actions";
import styled from "styled-components";

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const contacts = useSelector(selectContacts);
  const [search, setSearch] = useState<UserData[] | null>(null);

  return (
    <Wrapper>
      <Search search={search} updateSearch={setSearch} contacts={contacts} />
      <Button style={{ marginBottom: "30px" }} onClick={() => setOpen(!open)}>
        Create Modal
      </Button>
      <UsersList search={search} updateSearch={setSearch} contacts={contacts} updateOpen={setOpen} />

      {open && (
        <ModalUser
          callback={createContact}
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
`;

export default Home;
