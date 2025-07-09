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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className='flex flex-col w-[570px] h-[263px] px-[38px] py-[22px] bg-white rounded-[20px] -mt-[8px] relative z-0 m-16 gap-[10px]'>
      <div className='flex flex-col gap-[30px]'>
        <span className='font-bold text-[24px]'>전체 일정 달력</span>
        <div className='flex justify-between w-full'>
          {weekDates.map((day, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-[12px] cursor-pointer transition-colors
        ${day.isToday ? ' text-primary-30' : 'text-gray-30'}`}
              onClick={() => handleDateClick(day.date)}>
              <span className='font-medium text-[32px]'>{day.day}</span>
              <span className='text-center font-normal text-[20px]'>
                {day.dayName}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button className='px-[142px] py-[5.5px] text-white font-bold text-[15px] bg-secondary-50 cursor-pointer'>
        일정이 없습니다.로그인해주세요.
      </button>
    </div>
  );
}
