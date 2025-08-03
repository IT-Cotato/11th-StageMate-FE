import {useMemo, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {mockSchedules} from '@/mocks/mockSchedules';
import CalendarLayout from '@/components/calendar/CalendarLayout';
import ScheduleList from '@/components/main/ScheduleList';
import PageHeader from '@/components/global/PageHeader';
import SelectDateModal from '@/components/modal/SelectDateModal';
import SelectGenreModal from '@/components/modal/SelectGenreModal';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import {motion} from 'framer-motion';
import TagBadge from '@/components/global/TagBadge';

const CalendarPage = () => {
  const navigate = useNavigate();
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<'selectDate' | 'selectGenre'>(
    'selectDate'
  );
  // 추가된 관심태그들을 별도로 관리
  const [addedGenres, setAddedGenres] = useState<Set<string>>(new Set());

  const events = useMemo(
    () =>
      mockSchedules.map((s) => ({
        ...s,
        start: s.date,
        end: s.date,
      })),
    []
  );

  useEffect(() => {
    const base = selectedDate ?? currentDate;
    setSelectedYear(base.getFullYear());
    setSelectedMonth(base.getMonth() + 1);
  }, [selectedDate, currentDate]);

  const displayDate = selectedDate ?? currentDate;
  const allSchedulesForDate = useMemo(() => {
    return mockSchedules.filter(
      (s) => s.date.toDateString() === displayDate.toDateString()
    );
  }, [displayDate]);

  const filteredSchedules = useMemo(() => {
    // selectedGenre가 null이면 전체 스케줄 반환
    if (!selectedGenre) return allSchedulesForDate;
    return allSchedulesForDate.filter((s) => s.category === selectedGenre);
  }, [allSchedulesForDate, selectedGenre]);

  const uniqueCategories = useMemo(() => {
    // 현재 날짜의 실제 카테고리들
    const dateCategories = new Set(allSchedulesForDate.map((s) => s.category));
    // 추가된 관심태그들과 합치기
    const allCategories = new Set([...dateCategories, ...addedGenres]);
    return [...allCategories];
  }, [allSchedulesForDate, addedGenres]);

  const handleDateClick = (date: Date) => {
    window.scrollTo(0, 0);
    setSelectedDate(date);
    setCurrentDate(date);
    setSelectedGenre(null); // 날짜 변경 시 태그 선택 초기화
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(null);
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth() + 1);
    setSelectedGenre(null); // 오늘 버튼 클릭 시에도 태그 선택 초기화
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        selectedDate={selectedDate}
        currentDate={currentDate}
        onDateClick={handleDateClick}
        onNavigateDate={(date) => {
          setCurrentDate(date);
          setSelectedYear(date.getFullYear());
          setSelectedMonth(date.getMonth() + 1);
          setSelectedGenre(null); // 달력 네비게이션 시에도 태그 선택 초기화
        }}
      />
      {displayDate && (
        <div className='mt-10 px-22'>
          <div className='flex justify-between items-center mb-10'>
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
          <div className='flex flex-col gap-20'>
            {/* 카테고리 태그 렌더링 */}
            {uniqueCategories.length > 0 && (
              <div className='flex flex-wrap gap-10 '>
                {uniqueCategories.map((category) => (
                  <TagBadge
                    key={category}
                    label={category}
                    variant={selectedGenre === category ? 'filled' : 'outlined'}
                    onClick={() =>
                      setSelectedGenre((prev) =>
                        prev === category ? null : category
                      )
                    }
                  />
                ))}
              </div>
            )}
            <ScheduleList
              schedules={filteredSchedules}
              showViewMoreButton={false}
            />
            <button
              className='bg-primary font-bold text-[15px] text-white w-full py-5.5 rounded-[10px]'
              onClick={() => navigate('/calendar/report')}>
              다른 스테줄 제보하기
            </button>
          </div>
        </div>
      )}

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <>
          <div
            className='fixed top-[65px] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gray-3/10 z-40 rounded-[10px]'
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
              onDragEnd={(_, info) => {
                if (info.point.y > 300) closeModal();
              }}>
              <SelectDateModal
                onClick={(date) => {
                  setSelectedDate(date);
                  setCurrentDate(date);
                  closeModal();
                }}
              />
            </motion.div>
          ) : (
            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[600px]'>
              <SelectGenreModal
                selectedGenre={selectedGenre}
                setSelectedGenre={(genre: string | null) => {
                  // 새로운 장르가 추가되면 addedGenres에도 추가
                  if (genre) {
                    setAddedGenres((prev) => new Set([...prev, genre]));
                    setSelectedGenre(null);
                  }
                  closeModal();
                }}
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
