export const isValidId = (id: string): boolean => {
  if (id.length < 4 || id.length > 16) return false;

  const regex = /^[A-Za-z]{4,16}$/;
  return regex.test(id);
};

export const isValidPw = (pw: string): boolean => {
  if (pw.length < 4 || pw.length > 16) return false;

  const regex = /^[A-Za-z]{4,16}$/;
  return regex.test(pw);
};

export const isValidYear = (year: string): boolean => {
  if (year.length !== 4) return false;
  
  const regex = /^\d{4}$/;
  return regex.test(year);
};

export const isValidMonth = (month: string): boolean => {
  if (month.length !== 2) return false;
  
  const regex = /^\d{2}$/;
  return regex.test(month);
};

export const isValidDay = (day: string): boolean => {
  if (day.length !== 2) return false;
  
  const regex = /^\d{2}$/;
  return regex.test(day);
};
