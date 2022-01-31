import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { ModalAction, UserData } from "../../types";

type Props = {
  data: UserData[];
  updateData: (d: any) => any;
  action: ModalAction;
  info?: UserData;
  updateOpen: (a: any) => void;
};

const CreateUser: React.FC<Props> = ({
  data,
  updateData,
  action,
  info,
  updateOpen,
}) => {
  const onFinish = (values: UserData) => {
    if (action === ModalAction.Create) {
      const check = data.filter(
        (e) => e.name === values.name || e.phone === values.phone
      );

      if (!check.length) {
        updateData((prev: any) => [...prev, values]);
      }

      updateOpen(false);
    } else {
      const r: any = data.map((e: any) => {
        if (e.phone === info?.phone) {
          e.name = values.name;
          e.phone = values.phone;
          return e;
        }
        return e;
      });

      updateData(r);
      updateOpen(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);

  return (
    <div
      style={{
        backgroundColor: "#222",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "200px",
        }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите ваши инициалы!",
              },
            ]}
          >
            <Input placeholder="ФИО" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Пожалйуста, введите номер телефона!",
              },
            ]}
          >
            <Input placeholder="Номер телефона" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={() => updateOpen(false)}>Cancel</Button>
        </Form>
      </div>
    </div>
  );
};
export default CreateUser;
