import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {isSameDay} from 'date-fns';

interface CustomDateHeaderProps {
  label: string;
  date: Date;
  onDateClick: (date: Date) => void;
  // 선택적 props - 이미지 기능이 필요한 경우에만 전달
  events?: Array<{
    start: string | Date;
    imageUrl?: string;
    id?: string;
    [key: string]: unknown;
  }>;
  showImages?: boolean;
}

const CustomDateHeader: React.FC<CustomDateHeaderProps> = ({
  label,
  date,
  onDateClick,
  events = [],
  showImages = false,
}) => {
  const day = parseInt(label, 10);
  const navigate = useNavigate();

  // 이미지를 보여줘야 하고 events가 있는 경우에만 필터링
  const dayEvents = useMemo(() => {
    if (!showImages || !events.length) return [];
    return events.filter((event) => isSameDay(new Date(event.start), date));
  }, [events, date, showImages]);

  return (
    <div
      className='rbc-date-cell text-sm text-right pr-2 pt-2'
      onClick={() => onDateClick(date)}>
      {day}
      {showImages && (
        <div className='flex flex-col items-center mt-1 gap-1'>
          {dayEvents.map(
            (event, index) =>
              event.imageUrl && (
                <img
                  key={index}
                  src={event.imageUrl}
                  alt='티켓'
                  className='w-[50px] h-[65px] object-cover'
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/archive/${event.id}`);
                  }}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDateHeader;
