import { Rule } from "effector-forms";
import { isAfter, isBefore, format } from "date-fns";

function isValidData(value: any) {
  return Boolean(value) && value instanceof Date && !Number.isNaN(+value);
}

export const required = (): Rule<any> => ({
  name: "required",
  validator: Boolean,
  errorText: "Поле является обязательным",
});

export const numberMin = (min: number, exclude = false): Rule<any> => ({
  name: "numberMin",
  validator: (x) => {
    if (x === null || x === undefined || x === "") return true;
    const number = Number(x);
    if (Number.isNaN(number)) return false;

    if (exclude) return number > min;
    return number >= min;
  },
  errorText: `Значение поля должно быть больше ${min}`,
});

export const numberGreaterThanFiled = (
  fieldName: string,
  canBeEqual?: boolean
): Rule<string | number | null> => ({
  name: "numberGreaterThanFiled",
  validator: (x, fields) => {
    const numberField = Number(fields[fieldName]);
    const thisField = Number(x);

    const isGreater = canBeEqual
      ? thisField >= numberField
      : thisField > numberField;

    const isValid = Boolean(
      !Number.isNaN(numberField) && !Number.isNaN(thisField) && isGreater
    );
    return {
      isValid,
      errorText: numberField
        ? `Должно быть больше ${numberField}`
        : "Поле для сравнения пусто",
    };
  },
});

export const numberLessThanFiled = (
  fieldName: string,
  canBeEqual?: boolean
): Rule<string | number | null> => ({
  name: "numberLessThanFiled",
  validator: (x, fields) => {
    const numberField = Number(fields[fieldName]);
    const thisField = Number(x);

    const isLess = canBeEqual
      ? thisField <= numberField
      : thisField < numberField;

    const isValid = Boolean(
      !Number.isNaN(numberField) && !Number.isNaN(thisField) && isLess
    );
    return {
      isValid,
      errorText: numberField
        ? `Должно быть меньше ${numberField}`
        : "Поле для сравнения пусто",
    };
  },
});

export const dateAfterNow = (): Rule<Date | string | null> => ({
  name: "dateAfterThanField",
  validator: (x) => {
    if (!x) return { isValid: true };

    const date = typeof x === "string" ? new Date(x) : x;
    const isValid = Boolean(isValidData(date) && isAfter(date, new Date()));

    return {
      isValid,
      errorText: "Дата должна быть позже текущей",
    };
  },
});

export const dateAfterThanField = (fieldName: string): Rule<Date | null> => ({
  name: "dateAfterThanField",
  validator: (x, fields) => {
    const dateField = fields[fieldName] as Date;

    const isValid = Boolean(
      isValidData(dateField) && isValidData(x) && isAfter(x as Date, dateField)
    );
    return {
      isValid,
      errorText: dateField
        ? `Дата должна быть позже, чем ${format(dateField, "dd.MM.yyyy hh:mm")}`
        : "Поле для сравнения пусто",
    };
  },
});

export const dateBeforeThanField = (fieldName: string): Rule<Date | null> => ({
  name: "dateBeforeThanField",
  validator: (x, fields) => {
    const dateField = fields[fieldName] as Date;

    const isValid = Boolean(
      isValidData(dateField) && isValidData(x) && isBefore(x as Date, dateField)
    );
    return {
      isValid,
      errorText: dateField
        ? `Дата должна быть раньше, чем ${format(
            dateField,
            "dd.MM.yyyy hh:mm"
          )}`
        : "Поле для сравнения пусто",
    };
  },
});
