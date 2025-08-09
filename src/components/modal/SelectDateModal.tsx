import {useState} from 'react';
import ChevronUp from '@/assets/chevrons/chevron-up-sm.svg?react';
import ChevronDown from '@/assets/chevrons/chevron-down-sm.svg?react';

import {
  addYears,
  subYears,
  addMonths,
  subMonths,
  addDays,
  subDays,
  format,
} from 'date-fns';
import useScrollLockWithRestore from '@/hooks/useScrollLockwithRestore';

interface SelectDateModalProps {
  onClick: (selectedDate: Date) => void;
  onClose?: () => void;
}

const SelectDateModal = ({onClick}: SelectDateModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  useScrollLockWithRestore();

  const handleChange = (
    type: 'year' | 'month' | 'day',
    direction: 'up' | 'down'
  ) => {
    let newDate = selectedDate;

    if (type === 'year') {
      newDate =
        direction === 'up'
          ? addYears(selectedDate, 1)
          : subYears(selectedDate, 1);
    }
    if (type === 'month') {
      newDate =
        direction === 'up'
          ? addMonths(selectedDate, 1)
          : subMonths(selectedDate, 1);
    }
    if (type === 'day') {
      newDate =
        direction === 'up'
          ? addDays(selectedDate, 1)
          : subDays(selectedDate, 1);
    }

    setSelectedDate(newDate);
  };

  return (
    <div className='fixed sm:bottom-[60px] bottom-[45px] left-0 w-full flex justify-center items-end z-50'>
      <div className='sm:w-full sm:h-[302px] h-200 bg-white rounded-t-[20px] flex flex-col items-center justify-between px-10 sm:pb-40 pb-10 sm:pt-20 pt-10 font-roboto shadow-sm'>
        {/* 상단 드래그 바 */}
        <div className='sm:w-[200px] w-100 h-[6px] bg-[#D9D9D9] rounded-full mb-4' />

        {/* 날짜 선택 영역 */}
        <div className='flex items-center justify-center sm:w-300 sm:gap-40 gap-20 w-[300px]'>
          {/* 년 */}
          <div className='flex flex-col items-center sm:gap-20 gap-5'>
            <button onClick={() => handleChange('year', 'up')}>
              <ChevronUp className='cursor-pointer' />
            </button>
            <span className='text-2xl sm:text-4xl font-medium'>
              {format(selectedDate, 'yyyy')}
            </span>
            <button onClick={() => handleChange('year', 'down')}>
              <ChevronDown className='cursor-pointer' />
            </button>
          </div>

          {/* 월 */}
          <div className='flex flex-col items-center sm:gap-20 gap-5 sm:mr-25 mr-15'>
            <button onClick={() => handleChange('month', 'up')}>
              <ChevronUp className='cursor-pointer' />
            </button>
            <span className='text-2xl sm:text-4xl font-medium'>
              {format(selectedDate, 'M')}
            </span>
            <button onClick={() => handleChange('month', 'down')}>
              <ChevronDown className='cursor-pointer' />
            </button>
          </div>

          {/* 일 */}
          <div className='flex flex-col items-center sm:gap-20 gap-5 '>
            <button onClick={() => handleChange('day', 'up')}>
              <ChevronUp className='cursor-pointer' />
            </button>
            <span className='text-2xl sm:text-4xl font-medium'>
              {format(selectedDate, 'd')}
            </span>
            <button onClick={() => handleChange('day', 'down')}>
              <ChevronDown className='cursor-pointer' />
            </button>
          </div>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={() => onClick(selectedDate)}
          className='sm:w-full w-[370px] sm:h-48 h-30 bg-primary text-white text-lg sm:text-xl rounded-[14px] cursor-pointer'>
          확인
        </button>
      </div>
    </div>
  );
};

export default SelectDateModal;
