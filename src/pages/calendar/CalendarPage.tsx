import {useOutletContext} from 'react-router-dom';
import {useMemo, useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  getPerformanceSchedules,
  getPerformanceSchedulesPaginated,
} from '@/api/performanceScheduleApi';
import CalendarLayout from '@/components/calendar/CalendarLayout';
import ScheduleList from '@/components/main/ScheduleList';
import SelectDateModal from '@/components/modal/SelectDateModal';
import SelectGenreModal from '@/components/modal/SelectGenreModal';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import {motion} from 'framer-motion';
import TagBadge from '@/components/global/TagBadge';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import type {Schedule} from '@/types/schedule';
import {toSchedule} from '@/util/scheduleMapper';
import {useScrapStore} from '@/stores/useScrapStore';
const ITEMS_PER_PAGE = 10;

const CalendarPage = () => {
  const {setHeaderProps} = useOutletContext<{
    setHeaderProps: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
  }>();
  const {initializeFromServer} = useScrapStore();

  useEffect(() => {
    setHeaderProps({
      title: '전체 일정 달력',
      showHomeIcon: false,
      showBottomLine: true,
    });
  }, [setHeaderProps]);

  const navigate = useNavigate();
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [modalStep, setModalStep] = useState<'selectDate' | 'selectGenre'>(
    'selectDate'
  );

  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedSchedules, setPaginatedSchedules] = useState<Schedule[]>([]);
  const [isLoadingPaginated, setIsLoadingPaginated] = useState(false);

  const baseDate = selectedDate ?? currentDate;
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth() + 1;
  const latestFetchId = useRef(0);

  useEffect(() => {
    const fetchId = ++latestFetchId.current;
    let cancelled = false;

    (async () => {
      try {
        const apiData = await getPerformanceSchedules({year, month});
        if (cancelled || fetchId !== latestFetchId.current) return;
        setAllSchedules(apiData.map(toSchedule));
        
        // 전역 스크랩 상태 초기화
        initializeFromServer(
          apiData.map(item => ({
            id: String(item.performanceScheduleId),
            isScraped: item.isScraped
          }))
        );
      } catch (e) {
        if (!cancelled || fetchId !== latestFetchId.current) return;
        setAllSchedules([]);
        console.error(e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [year, month, initializeFromServer]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      const newGenres = new Set(prevGenres);
      if (newGenres.has(genre)) {
        newGenres.delete(genre);
      } else {
        newGenres.add(genre);
      }
      return newGenres;
    });
  };

  const events = useMemo(
    () =>
      allSchedules.map((schedule) => ({
        ...schedule,
        start: schedule.date,
        end: schedule.date,
      })),
    [allSchedules]
  );

  useEffect(() => {
    const base = selectedDate ?? currentDate;
    setSelectedYear(base.getFullYear());
    setSelectedMonth(base.getMonth() + 1);
  }, [selectedDate, currentDate]);

  // 선택된 날짜에 대한 페이지네이션 데이터 로드
  useEffect(() => {
    if (!selectedDate) {
      setPaginatedSchedules([]);
      setTotalPages(0);
      return;
    }

    const fetchPaginatedData = async () => {
      setIsLoadingPaginated(true);
      try {
        const result = await getPerformanceSchedulesPaginated({
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
          page: currentPage,
          size: ITEMS_PER_PAGE,
        });

        const schedules = result.list.map(toSchedule);
        setPaginatedSchedules(schedules);
        setTotalPages(result.totalPages);
        
        // 페이지네이션 데이터도 전역 스크랩 상태에 반영
        initializeFromServer(
          result.list.map(item => ({
            id: String(item.performanceScheduleId),
            isScraped: item.isScraped
          }))
        );
      } catch (error) {
        console.error('페이지네이션 데이터 로드 실패:', error);
        setPaginatedSchedules([]);
        setTotalPages(0);
      } finally {
        setIsLoadingPaginated(false);
      }
    };

    fetchPaginatedData();
  }, [selectedDate, currentPage, initializeFromServer]);

  const displayDate = selectedDate ?? currentDate;
  const allSchedulesForDate = useMemo(() => {
    return allSchedules.filter(
      (schedule) => schedule.date.toDateString() === displayDate.toDateString()
    );
  }, [allSchedules, displayDate]);

  const filteredSchedules = useMemo(() => {
    // 날짜가 선택된 경우 페이지네이션된 데이터 사용
    if (selectedDate) {
      if (!selectedGenre) return paginatedSchedules;
      return paginatedSchedules.filter(
        (schedule) => schedule.category === selectedGenre
      );
    }

    // 날짜가 선택되지 않은 경우 기존 로직 사용
    if (!selectedGenre) return allSchedulesForDate;
    return allSchedulesForDate.filter(
      (schedule) => schedule.category === selectedGenre
    );
  }, [allSchedulesForDate, selectedGenre, selectedDate, paginatedSchedules]);

  const uniqueCategories = useMemo(() => {
    const dateCategories = new Set(
      allSchedulesForDate.map((schedule) => schedule.category)
    );
    const allCategories = new Set([...dateCategories, ...selectedGenres]);
    return [...allCategories];
  }, [allSchedulesForDate, selectedGenres]);

  const handleDateClick = (date: Date) => {
    window.scrollTo({top: 0, behavior: 'auto'});
    setSelectedDate(date);
    setCurrentPage(1); // 날짜 변경 시 첫 페이지로 리셋
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-full max-w-[1000px] mx-auto'>
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
          setSelectedGenre(null);
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
            {uniqueCategories.length > 0 && (
              <div className='flex flex-wrap gap-10 '>
                {uniqueCategories.map((category) => (
                  <TagBadge
                    key={category}
                    label={category}
                    size='small'
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
            {isLoadingPaginated ? (
              <div className='space-y-12'>
                {Array.from({length: ITEMS_PER_PAGE}).map((_, index) => (
                  <div
                    key={index}
                    className='w-516 h-53 bg-gray-200 rounded animate-pulse'></div>
                ))}
              </div>
            ) : (
              <ScheduleList
                schedules={filteredSchedules}
                onLikeClick={() => {
                  // ScheduleItem에서 자체 처리하므로 별도 로직 불필요
                }}
                showLike={true}
                showViewMoreButton={false}
              />
            )}

            {/* 페이지네이션 (선택된 날짜의 총 페이지가 1보다 클 때만 표시) */}
            {selectedDate && totalPages > 1 && (
              <div className='flex justify-center items-center gap-10 mt-20'>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage <= 1}
                  className='px-12 py-6 border-primary border rounded-[6px] text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'>
                  이전
                </button>

                <span className='text-sm text-primary'>
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage >= totalPages}
                  className='px-12 py-6 border-primary border rounded-[6px] text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 '>
                  다음
                </button>
              </div>
            )}

            <button
              className='bg-primary font-bold text-[15px] text-white w-full py-5.5 rounded-[10px] cursor-pointer'
              onClick={() => navigate('/calendar/report')}>
              다른 스케줄 제보하기
            </button>
          </div>
        </div>
      )}

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
              onClick={(e) => e.stopPropagation()}
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
            <div
              className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[600px]'
              onClick={(e) => e.stopPropagation()}>
              <SelectGenreModal
                selectedGenre={[...selectedGenres]}
                setSelectedGenre={(genre) => toggleGenre(genre)}
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
