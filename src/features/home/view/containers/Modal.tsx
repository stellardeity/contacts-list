import React from "react";
import { Form, Input, Button } from "antd";
import { formatNumber } from "src/lib/format-number";
import styled from "styled-components";
import { useStore } from "effector-react";
import { ModalAction } from "src/types";
import { changeContact, insertContact } from "src/features/home/model/private";
import { $error, updateData } from "../../model/private";
import { $data } from "../../model/init";
import { setShowModal } from "src/features/home/model/private";

type Props = {
  action: ModalAction;
  contact?: UserData;
};

export const ModalUser: React.FC<Props> = ({ action, contact }) => {
  const isError = useStore($error);
  const data = useStore($data);

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === "phone") {
      value = formatNumber(value);
    }
    updateData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (data) {
      if (action === ModalAction.Create) {
        insertContact(data);
      } else {
        changeContact({
          key: contact?.name || "",
          name: data.name,
          phone: data.phone,
        });
      }
    }
    setShowModal(false);
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
              : `${contact?.name}`}
          </h1>

          <InputStyled
            name="name"
            required
            style={{ marginBottom: 10 }}
            value={data?.name || ""}
            placeholder="ФИО"
            onChange={handleChange}
          />
          <InputStyled
            required
            name="phone"
            value={data?.phone || ""}
            placeholder="Номер телефона"
            maxLength={12}
            onChange={handleChange}
          />

          {isError && <p style={{ color: "red" }}>{isError}</p>}

          <Buttons>
            <ButtonStyled
              size="large"
              type="primary"
              disabled={!!isError}
              htmlType="submit"
            >
              Submit
            </ButtonStyled>
            <ButtonStyled size="large" onClick={() => setShowModal(false)}>
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
