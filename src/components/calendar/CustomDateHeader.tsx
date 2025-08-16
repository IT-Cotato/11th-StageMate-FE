import type {HeaderProps} from 'react-big-calendar';
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
  const isSelected = selectedDate && isSameDay(date, selectedDate);

  // 중복 제거 + 해당 날짜 이벤트만 필터링
  const dayEvents = events.filter((e) => isSameDay(new Date(e.start), date));

  const getContainerClass = () =>
    `rbc-date-cell text-sm text-center pr-2 pt-2 cursor-pointer transition-all ${
      isSelected ? 'font-bold' : ''
    }`;

  return (
    <div
      className='rbc-date-cell text-sm text-center pr-2 pt-2 cursor-pointer transition-all'
      onClick={() => onDateClick(date)}>
      <span className={getContainerClass()}>{day}</span>

      {showImages && (
        <div className='flex flex-col items-center mt-1 gap-1'>
          {dayEvents.map((event) =>
            event.imageUrl ? (
              <img
                key={event.id}
                src={event.imageUrl}
                alt='티켓'
                className='w-[50px] h-[65px] object-cover'
                onClick={(e) => {
                  e.stopPropagation();
                  const archiveId = Number(event.id);
                  navigate(`/archive/write/${archiveId}`, {
                    state: {
                      mode: 'edit',
                      archiveId,
                    },
                  });
                }}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDateHeader;
