/**
 * 스케줄 배열을 리스트로 렌더링하는 컴포넌트
 */
import CalendarButton from './CalendarButton';
import ScheduleItem from './ScheduleItem';
import type {Schedule} from '@/types/schedule';

interface ScheduleListProps {
  schedules: Schedule[];
  onLikeClick?: (schedule: Schedule) => void;
  onScheduleClick?: (schedule: Schedule) => void;
  onViewMore?: () => void;
}

export default function ScheduleList({
  schedules,
  onLikeClick,
  onViewMore,
}: ScheduleListProps) {
  return (
    <div className='flex flex-col gap-[10px]'>
      {schedules.map((schedule) => (
        <ScheduleItem
          key={schedule.id}
          title={schedule.title}
          category={schedule.category}
          isLike={schedule.isLike}
          onLikeClick={() => onLikeClick?.(schedule)}
        />
      ))}

      {/* 더보기 버튼 */}
      {schedules.length > 0 && (
        <CalendarButton
          text='더 많은 스케줄 더보기'
          variant='default'
          onClick={onViewMore}
        />
      )}
    </div>
  );
}
