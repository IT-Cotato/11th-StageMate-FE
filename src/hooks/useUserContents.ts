import {getCommentedPosts, getMyPosts} from '@/api/mypageApi';
import {getUserCommunities, getUserMagazines} from '@/api/userApi';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

// 스크랩 매거진 훅
export const useUserMagazines = (page: number = 1, size: number = 6) => {
  return useQuery({
    queryKey: ['userMagazines', page, size],
    queryFn: () => getUserMagazines(page, size),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};

// 스크랩 글 훅
export const useUserCommunities = (page: number = 1, size: number = 6) => {
  return useQuery({
    queryKey: ['userCommunities', page, size],
    queryFn: () => getUserCommunities(page, size),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};

// 작성한 글 훅
export const useMyPosts = (page: number, size: number) => {
  return useQuery({
    queryKey: ['myPosts', page, size],
    queryFn: () => getMyPosts(page, size),
    placeholderData: keepPreviousData,
  });
};

// 댓글 단 글 훅
export const useCommentedPosts = (page: number, size: number) => {
  return useQuery({
    queryKey: ['commentedPosts', page, size],
    queryFn: () => getCommentedPosts(page, size),
    placeholderData: keepPreviousData,
  });
};
