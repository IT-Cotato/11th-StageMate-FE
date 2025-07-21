import type {Post} from '@/types/community';

export const mockPosts: Post[] = [
  {
    id: 1,
    category: '일상',
    title: '오늘 커튼콜 배우님 미쳤다 진짜...',
    likeCount: 147,
    commentCount: 100,
    isLiked: false,
    viewCount: 458,
  },
  {
    id: 2,
    category: '꿀팁',
    title: '뮤지컬 티켓팅 꿀팁 모음.zip',
    likeCount: 147,
    commentCount: 100,
    isLiked: true,
    viewCount: 458,
  },
  {
    id: 3,
    category: '일상',
    title: '뮤지컬 볼 때 혼관 vs 지인관 뭐가 더 좋음?',
    likeCount: 147,
    commentCount: 100,
    isLiked: false,
    viewCount: 218,
  },
  {
    id: 4,
    category: '나눔 · 거래',
    title: '<웃는 남자> 티켓 양도합니다.',
    likeCount: 147,
    commentCount: 100,
    isLiked: false,
    viewCount: 458,
  },
  {
    id: 5,
    category: '꿀팁',
    title: '블루스퀘어 가시는 분들 주차팁 + 맛집 추천',
    likeCount: 147,
    commentCount: 100,
    isLiked: false,
    viewCount: 458,
  },
];
