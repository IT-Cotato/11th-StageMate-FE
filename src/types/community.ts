export interface ChatRoom {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

export interface Magazine {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  isBookmarked: boolean;
}

export interface MagazinePostType {
  id: number;
  tag: string;
  isMarked: boolean;
  imgUrl: string | null;
  title: string;
  subTitle: string;
}

export interface SubMagazinePostType {
  id: number;
  tag: string;
  isMarked: boolean;
  imgUrl: string | null;
  title: string;
}

export interface Post {
  id: number;
  category: string;
  title: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  viewCount: number;
  nickname: string;
  date: string;
  isScrapped: boolean;
  bookmarkCount: number;
  imgUrls?: string[];
  content?: string;
  uniqueKey?: string; // 고유한 식별자를 위한 필드
}

export interface SharePost {
  id: number;
  category: '연극' | '뮤지컬';
  price: number | '추첨 나눔'; // 0원인 경우 무료 나눔
  title: string;
  isBookmarked: boolean;
  imgUrls?: string | null;
}

export interface Comment {
  id: number;
  nickname: string;
  profileImgUrl?: string;
  content: string;
  createdAt: string;
  replies: Reply[];
}

export interface Reply {
  id: number;
  nickname: string;
  profileImgUrl?: string;
  content: string;
  createdAt: string;
}

// ===== Common domain types =====
export interface ChatRoom {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

export interface Magazine {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  isBookmarked: boolean;
}

export interface MagazinePostType {
  id: number;
  tag: string;
  isMarked: boolean;
  imgUrl: string | null;
  title: string;
  subTitle: string;
}

export interface SubMagazinePostType {
  id: number;
  tag: string;
  isMarked: boolean;
  imgUrl: string | null;
  title: string;
}

export interface ContentDoc {
  type: 'doc';
  content?: unknown[];
}

export type TradeCategory = '뮤지컬' | '연극';
export type TradeMethod = '추첨나눔' | '선착나눔' | '판매';

export type ApiCategory = '일상' | '꿀팁' | '나눔거래';

export interface ImageInfo {
  id: number;
  url: string;
}

export interface ApiPost {
  id: number;
  title: string;
  author?: string;
  createdAt?: string;
  category: string; // '일상' | '꿀팁' | '나눔거래'
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  viewCount?: number;
  imageUrls?: {id: number; url: string}[];
  imageUrl?: string | null;
}

export interface CommunityPostListResponse {
  list: ApiPost[];
  totalElements: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
}
export interface CommunityPostDetail {
  id: number;
  title: string;
  content: ContentDoc;
  authorName: string;
  createdAt: string;
  viewCount: number;
  category: ApiCategory; // '일상' | '꿀팁' | '나눔거래'
  tradeCategory: TradeCategory | null;
  tradeMethod: TradeMethod | null;
  imageUrls: ImageInfo[];
  likeCount: number;
  commentCount: number;
  scrapCount: number;
  membersOnly: boolean;
  comments: Array<{
    id: number;
    writer: string;
    time: string;
    content: string;
    isEdited: boolean;
    children?: unknown[];
  }>;
  liked: boolean;
  scrapped: boolean;
}

export interface CommunityPostCreateRequest {
  title: string;
  content: ContentDoc;
  category: ApiCategory;
  tradeCategory: TradeCategory | null; // category !== 나눔거래 null
  tradeMethod: TradeMethod | null; // category !== 나눔거래 null
  membersOnly?: boolean;
}

export interface CommunityPostUpdateRequest extends CommunityPostCreateRequest {
  keepImageIds?: number[];
}

export interface Post {
  id: number;
  category: string;
  title: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  viewCount: number;
  nickname: string;
  date: string;
  isScrapped: boolean;
  bookmarkCount: number;
  imgUrls?: string[];
  content?: string;
  uniqueKey?: string;
}

export interface SharePost {
  id: number;
  category: '연극' | '뮤지컬';
  price: number | '추첨 나눔'; // 0원인 경우 무료 나눔
  title: string;
  isBookmarked: boolean;
  imgUrls?: string | null;
}

export interface Reply {
  id: number;
  nickname: string;
  profileImgUrl?: string;
  content: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  nickname: string;
  profileImgUrl?: string;
  content: string;
  createdAt: string;
  replies: Reply[];
}
