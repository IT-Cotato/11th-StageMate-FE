import type {Schedule} from '@/types/schedule';
import type {ScheduleListItem} from '@/types/schedule';

const LABEL: Record<'MUSICAL' | 'PLAY' | 'ETC', string> = {
  MUSICAL: '뮤지컬',
  PLAY: '연극',
  ETC: '기타',
};

const normalize = (raw: string): keyof typeof LABEL => {
  const t = raw?.trim().toUpperCase();
  if (t === 'MUSICAL' || t === 'PLAY' || t === 'ETC') return t;
  return 'ETC';
};

export function toSchedule(item: ScheduleListItem, idx: number): Schedule {
  const perf = item.performanceDetailResponse;
  const type = normalize(perf.performanceType);

  return {
    id: `${perf.performanceName}-${item.scheduleDate}-${idx}`,
    category: LABEL[type],
    title: item.title,
    isLike: item.isScraped,
    date: new Date(item.scheduleDate),
  };
}
