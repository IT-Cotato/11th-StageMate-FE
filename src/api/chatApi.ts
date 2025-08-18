import getErrorMessage from '@/util/getErrorMessage';
import {publicAxios} from './axios';
import {ENDPOINT} from './urls';

export const getChatRoom = async ({
  page,
  size = 10,
}: {
  page: number;
  size?: number;
}) => {
  try {
    const response = await publicAxios.get(ENDPOINT.CHAT_ROOM, {
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
