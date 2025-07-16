export const isValidId = (id: string): boolean => {
  if (id.length < 4 || id.length > 16) return false;

  const regex = /^[A-Za-z]{4,16}$/;
  return regex.test(id);
};

export const isValidPw = (pw: string): boolean => {
  if (pw.length < 8 || pw.length > 16) return false;

  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,16}$/;
  return regex.test(pw);
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
};

export const isValidYear = (year: string): boolean => {
  if (year.length !== 4) return false;

  const regex = /^\d{4}$/;
  return regex.test(year);
};

export const isValidMonth = (month: string): boolean => {
  if (month.length !== 2) return false;

  const regex = /^\d{2}$/;
  if (!regex.test(month)) return false;
  const monthNumber = parseInt(month, 10);
  return monthNumber >= 1 && monthNumber <= 12;
};

export const isValidDay = (day: string): boolean => {
  if (day.length !== 2) return false;

  const regex = /^\d{2}$/;
  if (!regex.test(day)) return false;
  const dayNumber = parseInt(day, 10);
  return dayNumber >= 1 && dayNumber <= 31;
};
