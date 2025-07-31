import type {HeaderProps} from 'react-big-calendar';
import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {isSameDay} from 'date-fns';
import type {CalendarEvent} from '@/components/calendar/CalendarLayout';

type CustomDateHeaderProps = HeaderProps & {
  events?: CalendarEvent[];
  onDateClick: (date: Date) => void;
  showImages?: boolean;
};

const CustomDateHeader: React.FC<CustomDateHeaderProps> = ({
  label,
  date,
  onDateClick,
  events = [],
  showImages = false,
}) => {
  const navigate = useNavigate();

  const day = parseInt(label, 10);

  const dayEvents = useMemo(() => {
    if (!showImages || !events.length) return [];
    return events.filter((event) => isSameDay(new Date(event.start), date));
  }, [events, date, showImages]);

  return (
    <div
      className='rbc-date-cell text-sm text-center pr-2 pt-2'
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
