/* eslint-disable @typescript-eslint/no-explicit-any */
import getErrorMessage from '@/util/getErrorMessage';
import {privateAxios, publicAxios} from './axios';
import {ENDPOINT} from './urls';
import qs from 'qs';
import type {ReportChatType} from '@/types/chat';

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
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const getChatProfile = async (senderIds: number[]) => {
  try {
    const response = await privateAxios.get(ENDPOINT.CHAT_PROFILE, {
      params: {senderIds},
      paramsSerializer: (params) =>
        qs.stringify(params, {arrayFormat: 'repeat'}),
    });
    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const getReportChatCount = async (userIds: number[]) => {
  try {
    const response = await privateAxios.get(ENDPOINT.REPORTS_CHAT_COUNT, {
      params: {userIds},
      paramsSerializer: (params) =>
        qs.stringify(params, {arrayFormat: 'repeat'}),
    });
    return response.data.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};

export const postReportChat = async (data: ReportChatType) => {
  try {
    const response = await privateAxios.post(ENDPOINT.REPORTS_CHAT, data);
    return response.data;
  } catch (error: any) {
    // const status = error.response.data.status;
    const code = error.response.data.code;
    const errorMessage = getErrorMessage(code);
    console.error(error);
    throw new Error(errorMessage);
  }
};
