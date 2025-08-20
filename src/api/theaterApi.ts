import type {ApiResponse} from '@/types/api';
import type {TheaterListResponse, TheaterListParams} from '@/types/theater';
import {publicAxios} from '@/api/axios';
import {ENDPOINT} from '@/api/urls';

export const getTheaterList = async (params?: TheaterListParams) => {
  const {data} = await publicAxios.get<ApiResponse<TheaterListResponse>>(
    ENDPOINT.THEATERS,
    {params}
  );
  return data;
};
