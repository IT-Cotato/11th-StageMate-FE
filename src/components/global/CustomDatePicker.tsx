import DatePicker from 'react-datepicker';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import '../styles/react-datepicker-custom.css';
interface CustomDatePickerProps {
  startDate: Date | null;
  setStartDate: (date: Date) => void;
  setIsOpen: (open: boolean) => void;
}
const CustomDatePicker = ({
  startDate,
  setStartDate,
  setIsOpen,
}: CustomDatePickerProps) => {
  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setIsOpen(false);
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      inline
      locale={ko}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className='flex items-center justify-between mb-10 bg-[#fff] px-20'>
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className='p-1 rounded hover:bg-gray-100 disabled:opacity-30'>
            <ChevronLeft className='w-20 h-20' />
          </button>
          <div className='text-lg font-semibold'>{format(date, 'yyyy.MM')}</div>
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className='p-1 rounded hover:bg-gray-100 disabled:opacity-30'>
            <ChevronRight className='w-20 h-20 text-gray-2' />
          </button>
        </div>
      )}
    />
  );
};

export default CustomDatePicker;
