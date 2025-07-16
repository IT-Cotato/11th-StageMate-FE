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
