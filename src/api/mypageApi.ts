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
