export interface CommunityPostSummary {
  id: number;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export interface CommunityTradePostSummary {
  id: number;
  title: string;
  category: string;
  tradeCategory: string;
  tradeMethod: string;
  isScrapped: boolean;
  imageUrl: string;
}

export interface CommunityHotPostSummary {
  id: number;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export interface PaginatedResponse<T> {
  list: T[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export type CommunityPostList = PaginatedResponse<CommunityPostSummary>;
export type CommunityHotPostList = PaginatedResponse<CommunityHotPostSummary>;
export type CommunityTradePostList =
  PaginatedResponse<CommunityTradePostSummary>;
