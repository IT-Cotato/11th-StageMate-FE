import type {Magazine, Post} from '@/types/community';
import {privateAxios} from './axios';
import {ENDPOINT} from './urls';

interface UserMagazinesResponse {
  status: string;
  timestamp: string;
  data: {
    list: Magazine[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}

interface UserCommunitiesResponse {
  status: string;
  timestamp: string;
  data: {
    list: Post[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}

export const getUserMagazines = async (
  page: number = 1,
  size: number = 6
): Promise<UserMagazinesResponse> => {
  const response = await privateAxios.get<UserMagazinesResponse>(
    ENDPOINT.USER_MAGAZINE,
    {
      params: {page, size},
    }
  );
  return response.data;
};

export const getUserCommunities = async (
  page: number = 1,
  size: number = 6
): Promise<UserCommunitiesResponse> => {
  const response = await privateAxios.get<UserCommunitiesResponse>(
    ENDPOINT.USER_COMMUNITIES,
    {
      params: {page, size},
    }
  );
  return response.data;
};
