import {privateAxios} from './axios';
import type {CommunityPostDetail} from '@/types/communityDetail';

export const getCommunityDetail = async (id: number) => {
  const {data} = await privateAxios.get<CommunityPostDetail>(
    `/community/${id}`
  );
  return data;
};
