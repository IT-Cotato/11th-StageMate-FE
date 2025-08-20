export type User = {
  id: number;
  userId: string;
  email: string;
  name: string;
  nickname: string;
  birth: string;
  profileImageUrl: string | null;
};

export type VerifyCodeType = {
  email: string;
  code: string;
};

export type SignupInfoType = {
  userId: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  birthdate: string;
};

export type LoginInfoType = {
  userId: string;
  password: string;
};

type FieldState = {
  value: string;
  isValid: boolean;
  isChecked?: boolean; // API 중복 확인을 실행했는지 여부
  isAvailable?: boolean; // 중복/사용 가능 여부
};

export type FormState = {
  id: FieldState;
  pw: FieldState;
  pwCheck: FieldState;
  name: FieldState;
  nickName: FieldState;
  email: FieldState;
  certificationNumber: FieldState;
  year: FieldState;
  month: FieldState;
  day: FieldState;
};
