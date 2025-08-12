import {useInfiniteQuery} from '@tanstack/react-query';
import {getImages} from '@/api/searchApi';

export const useInfiniteImageSearch = (query: string, display = 10) => {
  return useInfiniteQuery({
    queryKey: ['images', query],
    queryFn: ({pageParam = 1}) => getImages(query, display, pageParam),
    getNextPageParam: (lastPage) => {
      const nextStart = lastPage.start + lastPage.display;
      return nextStart <= lastPage.total ? nextStart : undefined;
    },
    initialPageParam: 1,
    enabled: !!query.trim(),
  });
};
