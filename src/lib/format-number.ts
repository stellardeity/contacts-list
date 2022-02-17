export const formatPhoneNumberRU = (num: string): string =>
  num.replace(/^[0-9]/, "+7").replace(/[^\d\\+]/g, "");
