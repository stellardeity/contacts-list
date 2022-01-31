import { Form, Input, Button } from "antd";
import { useState } from "react";
import { ModalAction, UserData } from "../types";

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
  const [newData, setNewData] = useState<UserData | null>(info || null);

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewData((prev: any) => {
      if (name === "phone") {
        value = value.replace(/^8/, "+7").replace(/[^\d\+]/g, "");
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    if (action === ModalAction.Create) {
      const check = data.filter(
        (e) => e.name === newData?.name || e.phone === newData?.phone
      );
      if (!check.length && newData) {
        const res = [...data, newData];
        updateData(res);
      }
    } else {
      const changedUserData: UserData[] = data.map((e: UserData) => {
        if (e.phone === info?.phone) {
          e.name = newData?.name || "";
          e.phone = newData?.phone || "";
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
        backgroundColor: "#2a9fff",
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
          width: "500px",
          backgroundColor: "#fff",
          padding: "180px 80px",
          borderRadius: "5px",
        }}
      >
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

          <Input
            name="name"
            style={{ padding: 10, marginBottom: 10, borderRadius: 5 }}
            value={newData?.name || ""}
            placeholder="ФИО"
            onChange={handleChange}
          />
          <Input
            name="phone"
            value={newData?.phone || ""}
            style={{ padding: 10, borderRadius: 5 }}
            placeholder="Номер телефона"
            maxLength={12}
            onChange={handleChange}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button
              style={{ marginLeft: 10, borderRadius: 5 }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              style={{ marginLeft: 10, borderRadius: 5 }}
              size="large"
              onClick={() => updateOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default CreateUser;
