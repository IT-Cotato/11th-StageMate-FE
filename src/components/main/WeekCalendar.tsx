import {useState} from 'react';

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

  return (
    <div className='flex flex-col w-[570px] h-[263px] px-[38px] py-[22px] bg-white rounded-[20px] -mt-[20px] relative z-0 m-16 gap-[10px]'>
      <span className='font-bold text'>전체 일정 달력</span>
    </div>
  );
}
