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
}

export interface SharePost {
  id: number;
  category: '연극' | '뮤지컬';
  price: number | '추첨 나눔'; // 0원인 경우 무료 나눔
  title: string;
  isBookmarked: boolean;
}
