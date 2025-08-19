import {privateAxios} from './axios';
import type {CommunityPostDetail} from '@/types/communityDetail';
import {ENDPOINT} from './urls';
import type {
  CommunityPostList,
  CommunityTradePostList,
  CommunityHotPostList,
} from '@/types/communityList';

export const getCommunityDetail = async (id: number) => {
  const res = await privateAxios.get<{data: CommunityPostDetail}>(
    ENDPOINT.COMMUNITY_DETAIL(id)
  );
  return res.data.data;
};

export const getCommunityPostList = async (
  category: string,
  page = 1,
  size = 10
): Promise<CommunityPostList> => {
  const res = await privateAxios.get<{data: CommunityPostList}>(
    ENDPOINT.COMMUNITY_LIST,
    {
      params: {category, page, size},
    }
  );
  return res.data.data;
};

export const getCommunityHotList = async (
  page = 1,
  size = 10
): Promise<CommunityHotPostList> => {
  const res = await privateAxios.get<{data: CommunityHotPostList}>(
    ENDPOINT.COMMUNITY_HOT_LIST,
    {params: {page, size}}
  );
  return res.data.data;
};

export const getTradePostList = async (
  page = 1,
  size = 10
): Promise<CommunityTradePostList> => {
  const res = await privateAxios.get<{data: CommunityTradePostList}>(
    ENDPOINT.COMMUNITY_TRADE_LIST,
    {params: {page, size}}
  );
  return res.data.data;
};
