import {getNotification} from '@/api/notificationApi';
import type {Notification} from '@/types/notification';
import {useQuery} from '@tanstack/react-query';

export const useNotifications = () => {
  return useQuery<Notification[], Error>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await getNotification();
      return res.data;
    },
    staleTime: 1000 * 60,
  });
};
