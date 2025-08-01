import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {mockSchedules} from '@/mocks/mockSchedules';
import CalendarLayout from '@/components/calendar/CalendarLayout';
import ScheduleList from '@/components/main/ScheduleList';
import PageHeader from '@/components/global/PageHeader';
import SelectDateModal from '@/components/modal/SelectDateModal';
import SelectGenreModal from '@/components/modal/SelectGenreModal';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import {motion} from 'framer-motion';

const CalendarPage = () => {
  const navigate = useNavigate();
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>('');
  const [modalStep, setModalStep] = useState<'selectDate' | 'selectGenre'>(
    'selectDate'
  );

  const events = useMemo(
    () =>
      mockSchedules.map((s) => ({
        ...s,
        start: s.date,
        end: s.date,
      })),
    []
  );

  const displayDate = selectedDate ?? currentDate;
  const filteredSchedules = useMemo(() => {
    return mockSchedules.filter(
      (s) => s.date.toDateString() === displayDate.toDateString()
    );
  }, [selectedDate, currentDate]);

  const handleDateClick = (date: Date) => {
    window.scrollTo(0, 0);
    setSelectedDate(date);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth() + 1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep('selectDate');
  };

  return (
    <div className='w-full max-w-[1000px] mx-auto'>
      <PageHeader
        title='전체 일정 달력'
        onLeftClick={() => navigate('/')}
        showHomeIcon={false}
        className='pt-0'
      />

      {/* 날짜 표시 + 오늘 버튼 */}
      <div className='flex justify-between items-center py-20'>
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => {
            setModalStep('selectDate');
            setIsModalOpen(true);
          }}>
          <p className='text-[18px] text-primary font-medium'>
            {selectedYear}년 {selectedMonth}월
          </p>
          <ChevronDown className='text-primary' />
        </div>

        <button
          className='text-primary-3 border-[1px] rounded-[10px] sm:text-xl text-[16px] sm:px-50 sm:py-5 px-20 hover:bg-gray-100 cursor-pointer'
          onClick={goToToday}>
          오늘
        </button>
      </div>

      <CalendarLayout
        events={events}
        currentDate={currentDate}
        onDateClick={handleDateClick}
        onNavigateDate={(date) => {
          setCurrentDate(date);
          setSelectedYear(date.getFullYear());
          setSelectedMonth(date.getMonth() + 1);
        }}
      />
      {displayDate && (
        <div className='mt-10'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>
              {displayDate.toLocaleDateString()} 전체 스케줄
            </h2>
            <button
              className='bg-primary-2 text-white border-[1px] rounded-[10px] sm:text-xl text-[16px] sm:px-16 sm:py-5 cursor-pointer'
              onClick={() => {
                setModalStep('selectGenre');
                setIsModalOpen(true);
              }}>
              관심태그 추가
            </button>
          </div>
          <ScheduleList schedules={filteredSchedules} />
        </div>
      )}

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <>
          <div
            className='fixed top-[230px] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gray-3/10 z-40 rounded-[10px]'
            onClick={closeModal}
          />
          {modalStep === 'selectDate' ? (
            <motion.div
              className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[600px]'
              initial={{y: 100}}
              animate={{y: 0}}
              exit={{y: 100}}
              transition={{type: 'tween', duration: 0.1}}
              drag='y'
              dragElastic={0}
              dragMomentum={false}
              dragConstraints={{top: 0, bottom: 100}}
              onDragEnd={(event, info) => {
                if (info.point.y > 300) closeModal();
              }}>
              <SelectDateModal
                onClick={(date) => {
                  setSelectedDate(date);
                  setModalStep('selectGenre');
                }}
              />
            </motion.div>
          ) : (
            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[600px]'>
              <SelectGenreModal
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                onClose={closeModal}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CalendarPage;
