import type {NotificationResponse} from '@/types/notification';
import {privateAxios} from './axios';
import {ENDPOINT} from './urls';

export const getNotification = async (): Promise<NotificationResponse> => {
  const res = await privateAxios.get(ENDPOINT.NOTIFICATION);
  return res.data;
};
