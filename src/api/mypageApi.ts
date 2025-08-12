/* eslint-disable @typescript-eslint/no-explicit-any */

import getErrorMessage from '@/util/getErrorMessage';
import {privateAxios} from './axios';
import {ENDPOINT} from './urls';

export const getMypageInfo = async () => {
  try {
    const response = await privateAxios.get(ENDPOINT.MYPAGE_INFO);
    return response.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error('An unexpected error occurred:', error);
    throw new Error(errorMessage);
  }
};

export const patchPassword = async ({
  currentPassword,
  newPassword,
  newPasswordConfirm,
}: {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}) => {
  try {
    const response = await privateAxios.patch(ENDPOINT.MYPAGE_CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
      newPasswordConfirm,
    });
    return response;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error('An unexpected error occurred:', error);
    throw new Error(errorMessage);
  }
};

export const getNocies = async ({
  page,
  size = 6,
}: {
  page: number;
  size?: number;
}) => {
  try {
    const response = await privateAxios.get(ENDPOINT.MYPAGE_NOTICES, {
      params: {
        page,
        size,
      },
    });
    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error('An unexpected error occurred:', error);
    throw new Error(errorMessage);
  }
};

export const getNociesDetail = async (id: number) => {
  try {
    const response = await privateAxios.get(ENDPOINT.MYPAGE_NOTICES_DETAIL(id));
    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error('An unexpected error occurred:', error);
    throw new Error(errorMessage);
  }
};

export const getPolicyPrivacy = async () => {
  try {
    const response = await privateAxios.get(ENDPOINT.MYPAGE_PRIVACY);
    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error('An unexpected error occurred:', error);
    throw new Error(errorMessage);
  }
};

export const getPolicyTerms = async () => {
  try {
    const response = await privateAxios.get(ENDPOINT.MYPAGE_TERMS);
    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error('An unexpected error occurred:', error);
    throw new Error(errorMessage);
  }
};
