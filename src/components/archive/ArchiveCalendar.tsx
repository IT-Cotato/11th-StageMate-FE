import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import ChevronUp from '@/assets/chevrons/chevron-up.svg?react';
import Plus from '@/assets/archive/archive-plus.svg?react';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import {ko} from 'date-fns/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useRef, useState} from 'react';
import './ArchiveCalendar.css';

const ArchiveCalendar = () => {
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {
      ko: ko,
    },
    locale: 'ko',
  });

  const shortDayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const CustomWeekHeader = ({date}: {date: Date}) => {
    const day = date.getDay();
    return (
      <div className='rbc-header text-center font-medium text-sm py-2'>
        {shortDayNames[day]}
      </div>
    );
  };
  const CustomDateHeader = ({label}: {label: string}) => {
    const day = parseInt(label, 10);

    return (
      <div className='rbc-date-cell text-sm text-right pr-2 pt-2'>{day}</div>
    );
  };

  const today = new Date();
  const [selectedYear] = useState(today.getFullYear());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(
    new Date(selectedYear, selectedMonth - 1, 1)
  );

  const months = Array.from({length: 12}, (_, i) => i + 1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelectMonth = (month: number) => {
    setSelectedMonth(month);
    setSelectedDate(new Date(selectedYear, month - 1, 1));
    setIsDropdownOpen(false);
  };

  return (
    <div className='w-full flex flex-col' ref={dropdownRef}>
      {/* 현재 선택된 월 표시 + 아이콘 */}
      <div className='relative w-full flex flex-row justify-between items-center'>
        <div
          className='flex flex-row items-center gap-1 cursor-pointer'
          onClick={toggleDropdown}>
          <p className='text-[18px] text-primary font-medium'>
            2025년 {selectedMonth}월
          </p>
          {isDropdownOpen ? (
            <ChevronUp className='text-primary' />
          ) : (
            <ChevronDown className='text-primary' />
          )}
        </div>

        {/* 드롭다운 목록 */}
        {isDropdownOpen && (
          <div className='absolute top-full mt-2 z-10 bg-[#fff] rounded-[10px] w-[93px] shadow-xl'>
            <ul className='px-3 py-3'>
              {months.map((month) => (
                <li
                  key={month}
                  className='text-[16px] text-primary font-medium cursor-pointer hover:bg-gray-100 hover:font-bold active:bg-gray-100 active:font-extrabold
            focus:bg-gray-100 focus:font-bold'
                  onClick={() => handleSelectMonth(month)}>
                  {month}월
                </li>
              ))}
            </ul>
          </div>
        )}

        {/** 추가 버튼과 오늘 버튼 */}
        <div className='flex flex-row gap-22'>
          <div className='w-38 h-38 flex items-center justify-center border border-primary rounded-full hover:bg-gray-100 active:bg-gray-100 cursor-pointer'>
            <Plus />
          </div>
          <button className='text-primary-3 border-[1px] rounded-[10px] flex items-center justify-center text-xl px-50 py-5 hover:bg-gray-100 hover:text-primary-2 cursor-pointer hover:border-primary active:text-primary-2 active:border-primary-2'>
            오늘
          </button>
        </div>
      </div>
      {/** 아카이빙 달력 */}
      <div className='w-full flex justify-center mt-20'>
        <div className='w-[1000px]'>
          <Calendar
            localizer={localizer}
            startAccessor='start'
            endAccessor='end'
            date={selectedDate}
            views={['month']}
            defaultView='month'
            style={{height: 700}}
            toolbar={false}
            components={{
              month: {
                header: CustomWeekHeader,
                dateHeader: CustomDateHeader,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchiveCalendar;
