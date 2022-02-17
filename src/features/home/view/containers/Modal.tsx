import React from "react";
import { Form, Input, Button } from "antd";
import { formatNumber } from "src/lib/format-number";
import styled from "styled-components";
import { useStore } from "effector-react";
import { ModalAction } from "src/types";
import { updateData } from "../../model/private";
import { $data, loginForm, loginFx } from "../../model/init";
import { setShowModal } from "src/features/home/model/private";
import { useForm } from "effector-forms";

type Props = {
  action: ModalAction;
  contact?: UserData;
};

export const ModalUser: React.FC<Props> = ({ action, contact }) => {
  const data = useStore($data);

  const { fields, submit } = useForm(loginForm);
  const pending = useStore(loginFx.pending);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit();
    // if (data) {
    //   if (action === ModalAction.Create) {
    //     insertContact(data);
    //   } else {
    //     changeContact({
    //       key: contact?.name || "",
    //       name: data.name,
    //       phone: data.phone,
    //     });
    //   }
    // }
    // setShowModal(false);
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
            value={fields.email.value}
            style={{ marginBottom: 10 }}
            // value={data?.name || ""}
            placeholder="ФИО"
            // onChange={handleChange}
            onChange={(e) => fields.email.onChange(e.target.value)}
          />
          <InputStyled
            required
            disabled={pending}
            name="phone"
            // value={data?.phone || ""}
            value={fields.password.value}
            placeholder="Номер телефона"
            maxLength={12}
            // onChange={handleChange}
            onChange={(e) => fields.password.onChange(e.target.value)}
          />

          {fields.email.errorText({
            email: "you must enter a valid email address",
          })}
          {fields.password.errorText({
            required: "password required",
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
