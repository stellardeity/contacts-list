import { Form, Input, Button } from "antd";
import { ModalAction, UserData } from "../../types";

type Props = {
  data: UserData[];
  updateData: (val: UserData[]) => void;
  action: ModalAction;
  info?: UserData | null;
  updateOpen: (val: boolean) => void;
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
        const res = [...data, values];
        updateData(res);
      }
    } else {
      const changedUserData: UserData[] = data.map((e: UserData) => {
        if (e.phone === info?.phone) {
          e.name = values.name;
          e.phone = values.phone;
          return e;
        }
        return e;
      });

      updateData(changedUserData);
    }
    updateOpen(false);
  };

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
