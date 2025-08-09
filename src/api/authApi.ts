/* eslint-disable @typescript-eslint/no-explicit-any */
import type {SignupInfoType, VerifyCodeType} from '@/types/auth';
import {publicAxios} from './axios';
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

    if (!tempUserKey) {
      throw new Error('임시 사용자 키가 없습니다. 다시 시도해주세요.');
    }

    if (!SERVICE_TERMS || !PRIVACY_POLICY) {
      throw new Error('필수 약관에 동의해주세요.');
    }

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
    console.error('An unexpected error occurred:', error);
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
    console.error('An unexpected error occurred:', error);
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
    console.error('An unexpected error occurred:', error);
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
    console.error('An unexpected error occurred:', error);
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
    console.error('An unexpected error occurred:', error);
    throw new Error(errorMessage);
  }
};

export const postSignupInfo = async (data: SignupInfoType) => {
  try {
    const response = await publicAxios.post(ENDPOINT.AUTH_SIGNUP_INFO, data);
    const {accessToken, refreshToken} = response.data.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error('An unexpected error occurred:', error);
    throw new Error(errorMessage);
  }
};
