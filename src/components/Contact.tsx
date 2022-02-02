import { Button } from "antd";
import { deleteContact } from "../redux/actions";
import styled from "styled-components";
import { useDispatch } from "react-redux";

type Props = {
  border: string;
  data: UserData;
  updateOpen: (val: boolean) => void;
  updateInfo: (val: UserData) => void;
  updateSearch: (val: UserData[] | null) => void
};

const ContactComponent: React.FC<Props> = ({
  border,
  data: { phone, name },
  updateInfo,
  updateOpen,
  updateSearch,
}) => {
  const dispatch = useDispatch();
  const handleEditData = ({ name, phone }: UserData) => {
    updateOpen(true);
    updateInfo({ name, phone });
  };

  const handleDeleteData = (name: UserData['name']) => {
    dispatch(deleteContact(name))
    updateSearch(null)
  }

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
        <Button
          danger
          style={{ marginLeft: 10 }}
          onClick={() => handleDeleteData(name)}
        >
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

export default ContactComponent;
