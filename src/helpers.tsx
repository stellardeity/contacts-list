import { errorsModalWindow } from "./constants";
import { ModalAction, UserData } from "./types";

export const formatNumber = (num: string): string =>
  num.replace(/^[0-9]/, "+7").replace(/[^\d\+]/g, "");

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
}: checkValidationType): 1 | undefined => {
  const check = contacts.filter(
    (e) => e.name === newData?.name || e.phone === newData?.phone
  );

  if (newData.phone.length < 12) {
    setError(errorsModalWindow.phoneIncorrect);
    return 1;
  }

  if (check.length && action === ModalAction.Create) {
    setError(errorsModalWindow.userAlreadyExists);
    return 1;
  }

  if (check.length >= 2 && action === ModalAction.Edit) {
    setError(errorsModalWindow.userAlreadyExists);
    return 1;
  }
};
