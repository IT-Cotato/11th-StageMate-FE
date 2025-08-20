import getErrorMessage from '@/util/getErrorMessage';
import {privateAxios} from './axios';
import {ENDPOINT} from './urls';
import qs from 'qs';

export const postUserBlock = async (blockedUserId: number) => {
  try {
    const response = await privateAxios.post(ENDPOINT.USER_BLOCK, {
      blockedUserId,
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

export const getUserBlockCheck = async (userIds: number[]) => {
  try {
    const response = await privateAxios.get(ENDPOINT.USER_BLOCK_CHECK, {
      params: {userIds},
      paramsSerializer: (params) =>
        qs.stringify(params, {arrayFormat: 'repeat'}),
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

export const getBlockedList = async ({
  page,
  size = 10,
}: {
  page: number;
  size?: number;
}) => {
  try {
    const response = await privateAxios.get(ENDPOINT.USER_BLOCKED_LIST, {
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

export const deleteUserBlocked = async (blockedUserId: number) => {
  try {
    const response = await privateAxios.delete(
      ENDPOINT.USER_UNBLOCKED(blockedUserId)
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
