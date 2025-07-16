export const isValidId = (id: string): boolean => {
  const regex = /^[A-Za-z]{4,16}$/;
  return regex.test(id);
};

export const isValidPw = (id: string): boolean => {
  const regex = /^[A-Za-z]{4,16}$/;
  return regex.test(id);
};
