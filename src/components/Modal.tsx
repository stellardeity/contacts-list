import { useState } from "react";
import { Form, Input, Button } from "antd";
import { ModalAction } from "../types";
import { checkValidation, formatNumber } from "../helpers";
import styled from "styled-components";
import { $contacts } from "../effector";
import { useStore } from "effector-react";

type Props = {
  action: ModalAction;
  info?: UserData | null;
  updateOpen: (val: boolean) => void;
  callback: (val: any) => void;
  model?: any;
};

const ModalUser: React.FC<Props> = ({
  action,
  info,
  updateOpen,
  callback,
  model,
}) => {
  const contacts = useStore($contacts);
  const [newData, setNewData] = useState<UserData>(
    info || { name: "", phone: "" }
  );
  const [error, setError] = useState<string | null>(null);

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewData((prev: UserData) => {
      if (name === "phone") {
        value = formatNumber(value);
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    const error = checkValidation({ contacts, setError, newData, action });
    if (error) return null;

    if (newData) {
      if (action === ModalAction.Create) {
        // create new contacts
      } else {
        // edit contacts
      }
    }
    updateOpen(false);
  };

  return (
    <Modal>
      <ModalInner>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <h1 style={{ marginBottom: 30, fontSize: 20 }}>
            {action === ModalAction.Create
              ? "Содать новый контакт"
              : `${info?.name}`}
          </h1>

          <InputStyled
            name="name"
            required
            style={{ marginBottom: 10 }}
            value={newData?.name || ""}
            placeholder="ФИО"
            onChange={handleChange}
          />
          <InputStyled
            required
            name="phone"
            value={newData?.phone || ""}
            placeholder="Номер телефона"
            maxLength={12}
            onChange={handleChange}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Buttons>
            <ButtonStyled
              size="large"
              onClick={() => model.insert(contacts, newData)}
              type="primary"
              htmlType="submit"
            >
              Submit
            </ButtonStyled>
            <ButtonStyled size="large" onClick={() => updateOpen(false)}>
              Cancel
            </ButtonStyled>
          </Buttons>
        </Form>
      </ModalInner>
    </Modal>
  );
};

const Modal = styled.div`
  background-color: #2a9fff;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalInner = styled.div`
  width: 500px;
  background-color: #fff;
  padding: 180px 80px;
  border-radius: 5px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const InputStyled = styled(Input)`
  padding: 10px;
  border-radius: 5;
`;

const ButtonStyled = styled(Button)`
  margin-left: 10px;
  border-radius: 5px;
`;

export default ModalUser;
