/* eslint-disable @typescript-eslint/no-explicit-any */
import type {LoginInfoType, SignupInfoType, VerifyCodeType} from '@/types/auth';
import {privateAxios, publicAxios} from './axios';
import {ENDPOINT} from './urls';
import getErrorMessage from '@/util/getErrorMessage';

export const getTempUserKey = async () => {
  const response = await publicAxios.get(ENDPOINT.AUTH_SIGNUP_TEMPUSERKEY);
  localStorage.setItem('TempUserKey', response.data.data);
};

export const postAgree = async (
  SERVICE_TERMS: boolean,
  PRIVACY_POLICY: boolean,
  MARKETING: boolean,
  SMS_NOTIFICATION: boolean,
  EMAIL_NOTIFICATION: boolean
) => {
  try {
    const tempUserKey = localStorage.getItem('TempUserKey');

    const response = await publicAxios.post(ENDPOINT.AUTH_SIGNUP_AGREE, {
      tempUserKey,
      consents: {
        SERVICE_TERMS,
        PRIVACY_POLICY,
        MARKETING,
        SMS_NOTIFICATION,
        EMAIL_NOTIFICATION,
      },
    });

    return response.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const getCheckUserId = async (userId: string) => {
  try {
    const response = await publicAxios.get(ENDPOINT.AUTH_CHECK_USERID(userId));
    return response.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const getCheckNickname = async (nickname: string) => {
  try {
    const response = await publicAxios.get(
      ENDPOINT.AUTH_CHECK_NICKNAME(nickname)
    );
    return response.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const postEmailSendCode = async (email: string) => {
  try {
    const response = await publicAxios.post(ENDPOINT.AUTH_EMAIL_SEND_CODE, {
      email,
    });
    return response.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const postEmailVerifyCode = async (data: VerifyCodeType) => {
  try {
    const response = await publicAxios.post(
      ENDPOINT.AUTH_EMAIL_VERIFY_CODE,
      data
    );
    return response.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const postSignupInfo = async (data: SignupInfoType) => {
  try {
    const response = await publicAxios.post(ENDPOINT.AUTH_SIGNUP_INFO, data);
    const {accessToken, refreshToken} = response.data.data;

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);

    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const postLogin = async (
  data: LoginInfoType,
  isStayingLoggedIn: boolean
) => {
  try {
    const response = await publicAxios.post(ENDPOINT.AUTH_LOGIN, data);
    const {accessToken, refreshToken} = response.data.data;

    if (isStayingLoggedIn) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isStayingLoggedIn', 'true');
    } else {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isStayingLoggedIn', 'false');
    }

    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const postLogout = async () => {
  try {
    const response = await privateAxios.post(ENDPOINT.AUTH_LOGOUT);
    return response;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const deleteWithdraw = async () => {
  try {
    const response = await privateAxios.delete(ENDPOINT.AUTH_WITHDRAW);
    return response;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const postTokenReissue = async () => {
  try {
    const refreshToken =
      localStorage.getItem('refreshToken') ||
      sessionStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await privateAxios.post(ENDPOINT.AUTH_REISSUE);

    const {accessToken, refreshToken: newRefreshToken} = response.data.data;

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error: any) {
    const code = error.response?.data?.code;
    const errorMessage = getErrorMessage(code);
    console.error('Token reissue failed:', error);
    throw new Error(errorMessage);
  }
};
