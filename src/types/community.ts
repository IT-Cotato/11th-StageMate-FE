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
  subTitle: string;
  isScraped: boolean;
  imageUrl: string;
}

export interface MagazinePostType {
  id: number;
  category: string;
  isScraped: boolean;
  imageUrl: string | null;
  title: string;
  subTitle: string;
}

export interface SubMagazinePostType {
  id: number;
  category: string;
  isScraped: boolean;
  imageUrl: string | null;
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
  author: string;
  createdAt: string;
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
