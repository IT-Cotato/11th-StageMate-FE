import CalendarButton from './CalendarButton';
import ScheduleItem from './ScheduleItem';

type ListRow = {
  id: number | string;
  title: string;
  category: string;
  isLike?: boolean;
};

interface ScheduleListProps<RowType extends ListRow = ListRow> {
  schedules: RowType[];
  onLikeClick?: (row: RowType) => void;
  onScheduleClick?: (row: RowType) => void;
  onViewMore?: () => void;
  showViewMoreButton?: boolean;
  showLike?: boolean;
  gap?: number;
  className?: string;
  selectedRowId?: string | number | null;
  isSelectable?: boolean;
}

const ScheduleList = <RowType extends ListRow = ListRow>({
  schedules,
  onLikeClick,
  onScheduleClick,
  onViewMore,
  showViewMoreButton = true,
  showLike = true,
  gap = 10,
  className = '',
  selectedRowId = null,
  isSelectable = false,
}: ScheduleListProps<RowType>) => {
  return (
    <div className={`flex flex-col ${className}`} style={{rowGap: gap}}>
      {schedules.map((row) => (
        <ScheduleItem
          key={row.id}
          title={row.title}
          category={row.category}
          showLike={showLike}
          isLike={row.isLike}
          onLikeClick={() => onLikeClick?.(row)}
          onClick={() => onScheduleClick?.(row)}
          selected={selectedRowId === row.id}
          isSelectable={isSelectable}
        />
      ))}
      {showViewMoreButton && schedules.length > 0 && (
        <CalendarButton
          text='더 많은 스케줄 더보기'
          variant='default'
          onClick={onViewMore}
        />
      )}
    </div>
  );
};

export type {ListRow, ScheduleListProps};
export default ScheduleList;
