import { useState } from "react";
import { Form, Input, Button } from "antd";
import { ModalAction, UserData } from "../types";
import { checkValidation, formatNumber } from "../helpers";

type Props = {
  updateContacts: (val: UserData & { key: UserData["name"] }) => void;
  createContacts: (val: UserData) => void;
  action: ModalAction;
  contacts: UserData[];
  info?: UserData | null;
  updateOpen: (val: boolean) => void;
};

const ModalUser: React.FC<Props> = ({
  action,
  info,
  updateOpen,
  updateContacts,
  createContacts,
  contacts,
}) => {
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
    if (error === 1) return null;

    if (newData) {
      if (action === ModalAction.Create) {
        createContacts({ name: newData.name, phone: newData.phone });
      } else {
        updateContacts({
          key: info?.name || "",
          name: newData.name,
          phone: newData.phone,
        });
      }
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
            required
            style={{ padding: 10, marginBottom: 10, borderRadius: 5 }}
            value={newData?.name || ""}
            placeholder="ФИО"
            onChange={handleChange}
          />
          <Input
            required
            name="phone"
            value={newData?.phone || ""}
            style={{ padding: 10, borderRadius: 5 }}
            placeholder="Номер телефона"
            maxLength={12}
            onChange={handleChange}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

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

export default ModalUser;
