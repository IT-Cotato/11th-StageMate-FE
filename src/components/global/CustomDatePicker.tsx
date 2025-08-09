import DatePicker from 'react-datepicker';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/react-datepicker-custom.css';
import Calendar from '@/assets/datepicker-calendar.svg?react';
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
      onClickOutside={() => setIsOpen(false)}
      renderCustomHeader={({date}) => (
        <div className='flex items-center gap-20 mb-10 mt-10 bg-[#fff] px-30'>
          <div className='flex flex-row items-center gap-20'>
            <Calendar />
            <div className='text-lg font-semibold'>
              {format(date, 'yyyy. MM. dd')}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default CustomDatePicker;
