import { errorsModalWindow } from "./constants";
import { ModalAction } from "./types";

export const formatNumber = (num: string): string =>
  num.replace(/^[0-9]/, "+7").replace(/[^\d\\+]/g, "");

type checkValidationType = {
  contacts: UserData[];
  action: string;
  newData: UserData;
  setError: (val: string) => void;
};

export const checkValidation = ({
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
