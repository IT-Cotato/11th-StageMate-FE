import {createContext} from 'react';

export interface CommunityPostContextType {
  postId: number | null;
  likeCount: number;
  scrapCount: number;
  commentCount: number;
  isLiked: boolean;
  isScrapped: boolean;
  setPostData: (data: {
    postId: number;
    likeCount: number;
    scrapCount: number;
    commentCount: number;
    isLiked: boolean;
    isScrapped: boolean;
  }) => void;
  onLikeClick?: () => void;
  onScrapClick?: () => void;
  setHandlers: (handlers: {
    onLikeClick: () => void;
    onScrapClick: () => void;
  }) => void;
}

export const CommunityPostContext =
  createContext<CommunityPostContextType | null>(null);
