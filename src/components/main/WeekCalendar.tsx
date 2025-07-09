import {format, startOfWeek, addDays, isSameDay, isToday} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useEffect, useState} from 'react';

export interface WeekDate {
  date: Date;
  day: number;
  dayName: string;
  isToday: boolean;
  isSelected: boolean;
}

export default function WeekCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState<WeekDate[]>([]);

  // 이번 주 날짜들 생성
  const generateWeekDates = (currentDate: Date): WeekDate[] => {
    const weekStart = startOfWeek(currentDate, {weekStartsOn: 0});
    const dates: WeekDate[] = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      dates.push({
        date,
        day: date.getDate(),
        dayName: format(date, 'E', {locale: ko}),
        isToday: isToday(date),
        isSelected: isSameDay(date, selectedDate),
      });
    }

    return dates;
  };

  useEffect(() => {
    setWeekDates(generateWeekDates(selectedDate));
  }, [selectedDate]);

  return (
    <div className='flex flex-col w-[570px] h-[263px] px-[38px] py-[22px] bg-white rounded-[20px] -mt-[20px] relative z-0 m-16 gap-[10px]'>
      <span className='font-bold text'>전체 일정 달력</span>
    </div>
  );
}
