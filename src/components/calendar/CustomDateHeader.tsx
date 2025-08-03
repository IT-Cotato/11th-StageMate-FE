import type {HeaderProps} from 'react-big-calendar';
import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {isSameDay} from 'date-fns';
import type {CalendarEvent} from '@/components/calendar/CalendarLayout';

type CustomDateHeaderProps = HeaderProps & {
  events?: CalendarEvent[];
  onDateClick: (date: Date) => void;
  showImages?: boolean;
  selectedDate?: Date | null;
};

const CustomDateHeader: React.FC<CustomDateHeaderProps> = ({
  label,
  date,
  onDateClick,
  events = [],
  showImages = false,
  selectedDate,
}) => {
  const navigate = useNavigate();
  const day = parseInt(label, 10);

  // 선택된 날짜만 체크
  const isSelected = selectedDate && isSameDay(date, selectedDate);

  const dayEvents = useMemo(() => {
    if (!showImages || !events.length) return [];
    return events.filter((event) => isSameDay(new Date(event.start), date));
  }, [events, date, showImages]);

  const getContainerClass = () => {
    if (isSelected) {
      return 'rbc-date-cell text-sm text-center pr-2 pt-2 cursor-pointer transition-all font-bold';
    }
    return 'rbc-date-cell text-sm text-center pr-2 pt-2 cursor-pointer transition-all';
  };

  return (
    <div
      className='rbc-date-cell text-sm text-center pr-2 pt-2 cursor-pointer transition-all'
      onClick={() => onDateClick(date)}>
      <span className={getContainerClass()}>{day}</span>

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
                    if (event.id) navigate(`/archive/${event.id}`);
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
