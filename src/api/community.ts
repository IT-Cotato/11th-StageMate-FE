import {privateAxios} from './axios';
import type {CommunityPostDetail} from '@/types/communityDetail';
import {ENDPOINT} from './urls';

export const getCommunityDetail = async (id: number) => {
  const res = await privateAxios.get<{data: CommunityPostDetail}>(
    ENDPOINT.COMMUNITY_DETAIL(id)
  );
  return res.data.data;
};
