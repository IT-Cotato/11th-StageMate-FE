import {privateAxios} from './axios';
import type {
  CommunityPostDetail,
  CommunityPostCreateRequest,
  CommunityPostUpdateRequest,
  CommunityComment,
  CommunityCommentCreateRequest,
  CommunityCommentUpdateRequest,
  CommunityReportRequest,
} from '@/types/communityDetail';
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

export const createCommunityPost = async (
  request: CommunityPostCreateRequest,
  images: (File | Blob)[] = []
): Promise<CommunityPostDetail> => {
  const form = new FormData();
  form.append(
    'request',
    new Blob([JSON.stringify(request)], {type: 'application/json'})
  );
  images.forEach((f) => form.append('images', f));
  const res = await privateAxios.post<{data: CommunityPostDetail}>(
    ENDPOINT.COMMUNITY_CREATE,
    form
  );
  return res.data.data;
};

export const updateCommunityPost = async (
  postId: number,
  postData: CommunityPostUpdateRequest,
  images: (File | Blob)[] = []
): Promise<CommunityPostDetail> => {
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(postData)], {type: 'application/json'})
  );
  images.forEach((file) => formData.append('images', file));

  const res = await privateAxios.put<{data: CommunityPostDetail}>(
    ENDPOINT.COMMUNITY_UPDATE(postId),
    formData
  );
  return res.data.data;
};

export const deleteCommunityPost = async (postId: number): Promise<void> => {
  await privateAxios.delete(ENDPOINT.COMMUNITY_DELETE(postId));
};

export const toggleCommunityPostLike = async (
  postId: number
): Promise<void> => {
  await privateAxios.post(ENDPOINT.COMMUNITY_LIKE(postId));
};

export const toggleCommunityPostScrap = async (
  postId: number
): Promise<void> => {
  await privateAxios.post(ENDPOINT.COMMUNITY_SCRAP(postId));
};

// 댓글 관련 API
export const getCommunityComments = async (
  postId: number
): Promise<CommunityComment[]> => {
  const res = await privateAxios.get<{data: CommunityComment[]}>(
    ENDPOINT.COMMUNITY_COMMENT_LIST(postId)
  );
  return res.data.data;
};

export const createCommunityComment = async (
  postId: number,
  request: CommunityCommentCreateRequest
): Promise<void> => {
  await privateAxios.post(ENDPOINT.COMMUNITY_COMMENT_CREATE(postId), request);
};

export const updateCommunityComment = async (
  commentId: number,
  request: CommunityCommentUpdateRequest
): Promise<void> => {
  await privateAxios.put(ENDPOINT.COMMUNITY_COMMENT_UPDATE(commentId), request);
};

export const deleteCommunityComment = async (
  commentId: number
): Promise<void> => {
  await privateAxios.delete(ENDPOINT.COMMUNITY_COMMENT_DELETE(commentId));
};

// 신고 관련 API
export const reportCommunity = async (
  request: CommunityReportRequest
): Promise<void> => {
  await privateAxios.post(ENDPOINT.COMMUNITY_REPORT, request);
};
