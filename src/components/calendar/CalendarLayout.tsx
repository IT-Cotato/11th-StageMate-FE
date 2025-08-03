import {Calendar} from 'react-big-calendar';
import localizer from './localizer';
import CustomDateHeader from './CustomDateHeader';
import CustomWeekHeader from './CustomWeekHeader';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export interface CalendarEvent {
  id?: string | number;
  title?: string;
  start: Date;
  end: Date;
  imageUrl?: string;
}

type CalendarLayoutProps = {
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  currentDate: Date;
  selectedDate: Date | null;
  onNavigateDate?: (date: Date) => void;
};

const CalendarLayout = ({
  events,
  onDateClick,
  onEventClick,
  currentDate,
  selectedDate,
  onNavigateDate,
}: CalendarLayoutProps) => {
  const handleNavigate = (date: Date) => {
    onNavigateDate?.(date);
  };

  return (
    <div className='w-full'>
      <Calendar
        localizer={localizer}
        events={events}
        date={currentDate}
        onNavigate={handleNavigate}
        startAccessor='start'
        endAccessor='end'
        views={['month']}
        defaultView='month'
        toolbar={false}
        style={{height: 600, width: '100%'}}
        components={{
          month: {
            header: CustomWeekHeader,
            dateHeader: (props) => (
              <CustomDateHeader
                {...props}
                events={events}
                onDateClick={onDateClick}
                showImages={true}
                localizer={localizer}
                selectedDate={selectedDate}
              />
            ),
            event: () => null,
          },
        }}
        onSelectEvent={onEventClick}
      />
    </div>
  );
};

export default CalendarLayout;
