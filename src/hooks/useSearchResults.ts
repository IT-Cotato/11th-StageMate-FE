import {getSearchPopular, getSearchResult} from '@/api/searchApi';
import type {SearchParams} from '@/types/search';
import {useQuery} from '@tanstack/react-query';

export const useSearchResult = (params: SearchParams) => {
  return useQuery({
    queryKey: ['searchResult', params],
    queryFn: () => getSearchResult(params),
    enabled: false,
  });
};

export const useSearchPopular = (enabled: boolean) => {
  return useQuery({
    queryKey: ['searchPopular'],
    queryFn: getSearchPopular,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
