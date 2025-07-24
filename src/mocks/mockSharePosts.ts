import type {SharePost} from '@/types/community';

export const mockSharePosts: SharePost[] = [
  {
    id: 1,
    category: '뮤지컬',
    price: 0,
    title: '위키드 포토카드 나눔',
    isBookmarked: false,
  },
  {
    id: 2,
    category: '뮤지컬',
    price: 100000,
    title: '시카고 R석 판매',
    isBookmarked: true,
  },
  {
    id: 3,
    category: '연극',
    price: '추첨 나눔',
    title: '<옥탑방고양이> 포토카드 나눔',
    isBookmarked: false,
  },
];
