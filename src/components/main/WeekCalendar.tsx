import {format, startOfWeek, addDays, isSameDay, isToday} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useEffect, useState, useMemo, useCallback} from 'react';
import CalendarButton from './CalendarButton';
import ScheduleList from './ScheduleList';
import type {Schedule} from '@/types/schedule';

export interface WeekDate {
  date: Date;
  day: number;
  dayName: string;
  isToday: boolean;
  isSelected: boolean;
}

interface WeekCalendarProps {
  isLoggedIn: boolean;
  schedules?: Schedule[];
  onLikeClick?: (schedule: Schedule) => void;
  onScheduleClick?: (schedule: Schedule) => void;
  onViewMore?: () => void;
}

function generateWeekDates(currentDate: Date, selectedDate: Date): WeekDate[] {
  const weekStart = startOfWeek(currentDate, {weekStartsOn: 0});

  return Array.from({length: 7}).map((_, i) => {
    const date = addDays(weekStart, i);
    return {
      date,
      day: date.getDate(),
      dayName: format(date, 'E', {locale: ko}),
      isToday: isToday(date),
      isSelected: isSameDay(date, selectedDate),
    };
  });
}
const WeekCalendar = ({
  isLoggedIn,
  schedules = [],
  onLikeClick,
  onScheduleClick,
  onViewMore,
}: WeekCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState<WeekDate[]>([]);

  useEffect(() => {
    setWeekDates(generateWeekDates(selectedDate, selectedDate));
  }, [selectedDate]);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // 선택된 날짜의 스케줄 필터링
  const selectedDateSchedules = useMemo(
    () =>
      schedules.filter((schedule) => isSameDay(schedule.date, selectedDate)),
    [schedules, selectedDate]
  );

  const renderBottomContent = () => {
    if (!isLoggedIn) {
      return (
        <CalendarButton
          text='일정이 없습니다. 로그인해주세요'
          variant='default'
        />
      );
    }

    if (selectedDateSchedules.length === 0) {
      return (
        <CalendarButton
          text='일정이 없습니다. 추가해주세요'
          variant='outline'
        />
      );
    }

    return (
      <ScheduleList
        schedules={selectedDateSchedules}
        onLikeClick={onLikeClick}
        onScheduleClick={onScheduleClick}
        onViewMore={onViewMore}
      />
    );
  };

  return (
    <div className='flex flex-col w-full min-h-[201px] px-[22px] py-[20px] bg-white rounded-[20px] relative z-0 gap-[10px]'>
      <div className='flex flex-col gap-[10px]'>
        <span className='font-bold text-[24px]'>오늘의 일정</span>
        <div className='flex justify-between w-full'>
          {weekDates.map((day, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-[12px] cursor-pointer transition-colors
                ${day.isSelected ? 'text-secondary' : 'text-gray-30'}`}
              onClick={() => handleDateClick(day.date)}>
              <span className='font-medium text-[32px]'>{day.day}</span>
              <span className='text-center font-normal text-[20px]'>
                {day.dayName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {renderBottomContent()}
    </div>
  );
};

export default WeekCalendar;
