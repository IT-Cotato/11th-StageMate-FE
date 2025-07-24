import type {Schedule} from '@/types/schedule';

export const mockSchedules: Schedule[] = [
  {
    id: '0',
    category: '연극',
    title: '<어쩌구 연극> 3차 티켓팅',
    isLike: false,
    date: new Date('2025-07-10'),
  },
  {
    id: '1',
    category: '연극',
    title: '<어쩌구 연극> 3차 티켓팅',
    isLike: true,
    date: new Date('2025-07-10'),
  },
  {
    id: '2',
    category: '콘서트',
    title: '<어쩌구 콘서트> 3차 티켓팅',
    isLike: true,
    date: new Date('2025-07-13'),
  },
  {
    id: '3',
    category: '뮤지컬',
    title: '<어쩌구 뮤지컬> 3차 티켓팅',
    isLike: false,
    date: new Date('2025-07-13'),
  },
];
