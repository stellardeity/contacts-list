import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useStore } from "effector-react";
import { ModalAction } from "src/types";
import {
  $modalType,
  closeModal,
  userDataForm,
} from "src/features/home/model/private";
import { useForm } from "effector-forms";
import { formatPhoneNumberRU } from "src/lib/format-number";

export const ModalWindow: React.FC = () => {
  const { fields, submit } = useForm(userDataForm);
  const action = useStore($modalType);
  return (
    <WrapperModal>
      <ModalInner>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={() => submit()}
          autoComplete="off"
        >
          <WrapperTitle>
            {action === ModalAction.Create
              ? "Содать новый контакт"
              : `${fields.name.value}`}
          </WrapperTitle>

          <InputStyled
            name="name"
            value={fields.name.value}
            style={{ marginBottom: 10 }}
            placeholder="ФИО"
            onChange={({ target }) => fields.name.onChange(target.value)}
          />

          {fields.name.firstError?.errorText}

          <InputStyled
            name="phone"
            value={fields.phone.value}
            placeholder="Номер телефона"
            minLength={12}
            maxLength={12}
            onChange={({ target }) =>
              fields.phone.onChange(formatPhoneNumberRU(target.value))
            }
          />

          {fields.phone.firstError?.errorText}

          <Buttons>
            <ButtonStyled size="large" type="primary" htmlType="submit">
              Submit
            </ButtonStyled>
            <ButtonStyled size="large" onClick={() => closeModal()}>
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
