import { errorsModalWindow, ModalAction } from "src/types";

type checkValidationType = {
  contacts: UserData[];
  action: string;
  newData: UserData;
  setError: (val: string) => void;
};

export const validationForm = ({
  contacts,
  action,
  newData,
  setError,
}: checkValidationType): boolean => {
  const check = contacts.filter(
    (e) => e.name === newData?.name || e.phone === newData?.phone
  );

  if (newData.phone.length < 12) {
    setError(errorsModalWindow.phoneIncorrect);
    return true;
  }

  if (check.length && action === ModalAction.Create) {
    setError(errorsModalWindow.userAlreadyExists);
    return true;
  }

  if (check.length >= 2 && action === ModalAction.Edit) {
    setError(errorsModalWindow.userAlreadyExists);
    return true;
  }

  return false;
};
