import type {
  ImageSearchResponse,
  SearchParams,
  SearchPopularResponse,
} from '@/types/search';
import {privateAxios, publicAxios} from './axios';
import {ENDPOINT} from './urls';

// 네이버 이미지 검색 get
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

// 실시간 인기 검색어 get
export const getSearchPopular = async (): Promise<SearchPopularResponse> => {
  const res = await publicAxios.get(ENDPOINT.SEARCH_POPULAR);
  return res.data;
};

// 검색하기 get
export const getSearchResult = async (params: SearchParams) => {
  const response = await privateAxios.get(ENDPOINT.SEARCH, {params});
  return response.data;
};
