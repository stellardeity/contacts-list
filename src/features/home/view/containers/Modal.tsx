import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useStore } from "effector-react";
import { ModalAction } from "src/types";
import { UserDataForm } from "../../model/init";
import {
  $contacts,
  $editContactData,
  $error,
  changeError,
  changeUserData,
  setShowModal,
} from "src/features/home/model/private";
import { useForm } from "effector-forms";
import { formatPhoneNumberRU } from "src/lib/format-number";

type Props = {
  action: ModalAction;
};

export const ModalUser: React.FC<Props> = ({ action }) => {
  const { fields } = useForm(UserDataForm);
  const pending = useStore(changeUserData.pending);
  const contact = useStore($editContactData);
  const contacts = useStore($contacts);
  const errorText = useStore($error);

  const handleSubmit = () => {
    const { phone, name } = fields;
    const test = contacts.filter(
      (e) => e.name === name.value || e.phone === phone.value
    );
    if (!test.length) {
      const data = {
        name: name.value,
        phone: phone.value,
      };
      changeUserData({ data, action, contact });
      setShowModal(null);
    } else {
      changeError("Такой пользователь уже существует!");

      setTimeout(() => {
        changeError("");
      }, 2000);
    }
  };

  return (
    <WrapperModal>
      <ModalInner>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <WrapperTitle>
            {action === ModalAction.Create
              ? "Содать новый контакт"
              : `${contact?.name}`}
          </WrapperTitle>

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
            minLength={12}
            maxLength={12}
            onChange={({ target }) =>
              fields.phone.onChange(formatPhoneNumberRU(target.value))
            }
          />

          <Error>{errorText}</Error>

          <Buttons>
            <ButtonStyled
              size="large"
              type="primary"
              disabled={pending}
              htmlType="submit"
            >
              Submit
            </ButtonStyled>
            <ButtonStyled size="large" onClick={() => setShowModal(null)}>
              Cancel
            </ButtonStyled>
          </Buttons>
        </Form>
      </ModalInner>
    </WrapperModal>
  );
};

const WrapperModal = styled.div`
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

const WrapperTitle = styled.h1`
  margin-bottom: 30;
  font-size: 20px;
`;

const Error = styled.p`
  color: red;
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
