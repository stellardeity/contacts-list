import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useStore } from "effector-react";
import { ModalAction } from "src/types";
import { UserDataForm } from "../../model/init";
import {
  $editContactData,
  handlerUserData,
  setShowModalCreate,
  setShowModalEdit,
} from "src/features/home/model/private";
import { useForm } from "effector-forms";

type Props = {
  action: ModalAction;
};

export const ModalUser: React.FC<Props> = ({ action }) => {
  const { fields } = useForm(UserDataForm);
  const pending = useStore(handlerUserData.pending);
  const contact = useStore($editContactData);

  const handleSubmit = () => {
    const data = { name: fields.name.value, phone: fields.phone.value };
    handlerUserData({ data, action, contact });
    action === ModalAction.Create
      ? setShowModalCreate(false)
      : setShowModalEdit(false);
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
            disabled={pending}
            required
            value={fields.name.value}
            style={{ marginBottom: 10 }}
            placeholder="ФИО"
            onChange={({ target }) => fields.name.onChange(target.value)}
          />
          <InputStyled
            required
            disabled={pending}
            name="phone"
            value={fields.phone.value}
            placeholder="Номер телефона"
            maxLength={12}
            onChange={({ target }) => fields.phone.onChange(target.value)}
          />

          {fields.name.errorText({
            name: "you must enter a valid name address",
          })}
          {fields.phone.errorText({
            required: "phone required",
          })}

          <Buttons>
            <ButtonStyled
              size="large"
              type="primary"
              disabled={pending}
              htmlType="submit"
            >
              Submit
            </ButtonStyled>
            <ButtonStyled
              size="large"
              onClick={() =>
                action === ModalAction.Create
                  ? setShowModalCreate(false)
                  : setShowModalEdit(false)
              }
            >
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
