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
  bookmarkCount: number;
  imgUrls?: string[]; // 게시글 이미지 URL, 선택적
  content?: string; // 게시글 내용, 선택적
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
