import type {ImageSearchResponse} from '@/types/search';
import {privateAxios} from './axios';
import {ENDPOINT} from './urls';

export const getImages = async (
  query: string,
  display = 10,
  start = 1
): Promise<ImageSearchResponse> => {
  if (!query.trim()) {
    return {
      lastBuildDate: '',
      total: 0,
      start: 0,
      display: 0,
      items: [],
    };
  }

  const res = await privateAxios.get(ENDPOINT.IMAGE_SEARCH, {
    params: {
      query,
      display,
      start,
      sort: 'sim',
      filter: 'all',
    },
  });

  return res.data.data;
};
