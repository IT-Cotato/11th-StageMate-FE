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
import {motion} from 'framer-motion';
import {useMemo, useRef, useState} from 'react';
import '../styles/react-big-calendar-custom.css';
import SelectDateModal from '../modal/SelectDateModal';
import TicketAddModal from '../modal/TicketAddModal';
import CameraUnavailableModal from '../modal/CameraUnavailableModal';
import {useNavigate} from 'react-router-dom';
import {isSameDay} from 'date-fns';
import {useArchiveStore} from '@/stores/useArchiveStore';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {ko},
  locale: 'ko',
});

const shortDayNames = ['일', '월', '화', '수', '목', '금', '토'];

const CustomWeekHeader = ({date}: {date: Date}) => {
  const day = date.getDay();
  return (
    <div className='rbc-header text-center font-medium text-sm py-2 mr-5'>
      {shortDayNames[day]}
    </div>
  );
};

const CustomDateHeader = ({
  label,
  date,
  events,
  onDateClick,
}: {
  label: string;
  date: Date;
  events: Array<{
    start: string | Date;
    imageUrl?: string;
    [key: string]: unknown;
  }>;
  onDateClick: (date: Date) => void;
}) => {
  const day = parseInt(label, 10);
  const navigate = useNavigate();

  // 현재 셀에 해당하는 이벤트만 필터링
  const dayEvents = useMemo(
    () => events.filter((event) => isSameDay(new Date(event.start), date)),
    [events, date]
  );

  return (
    <div
      className='rbc-date-cell text-sm text-right pr-2 pt-2'
      onClick={() => onDateClick(date)}>
      {day}
      <div className='flex flex-col items-center mt-1 gap-1'>
        {dayEvents.map(
          (event, index) =>
            event.imageUrl && (
              <img
                key={index}
                src={event.imageUrl}
                alt='티켓'
                className='w-[50px] h-[65px] object-cover'
                onClick={() => navigate(`/archive/${event.id}`)}
              />
            )
        )}
      </div>
    </div>
  );
};

const ArchiveCalendar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [modalStep, setModalStep] = useState<'selectDate' | 'ticketAdd'>(
    'selectDate'
  );

  // 달력 헤더 월 선택 상태
  const today = new Date();
  const [selectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const months = Array.from({length: 12}, (_, i) => i + 1);

  const handleSelectMonth = (month: number) => {
    setSelectedMonth(month);
    setIsDropdownOpen(false);
  };

  // zustand에서 records 가져오기
  const records = useArchiveStore((state) => state.records);

  // zustand records를 events 타입으로 변환
  const events = useMemo(
    () =>
      records.map((record) => ({
        ...record,
        start: new Date(record.date), // string 변환
        end: new Date(record.date),
      })),
    [records]
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep('selectDate');
  };

  const handleDateClick = (date: Date) => {
    window.scrollTo(0, 0);
    setSelectedDate(date);
    setModalStep('ticketAdd'); // 바로 티켓 추가 모달 열기
    setIsModalOpen(true);
  };

  return (
    <div className='w-full flex flex-col' ref={dropdownRef}>
      {/* 헤더 */}
      <div className='relative w-full flex flex-row justify-between items-center'>
        <div
          className='flex flex-row items-center gap-1 cursor-pointer'
          onClick={() => !isModalOpen && toggleDropdown()}>
          <p className='text-[18px] text-primary font-medium'>
            {selectedYear}년 {selectedMonth}월
          </p>
          {isDropdownOpen ? (
            <ChevronUp className='text-primary' />
          ) : (
            <ChevronDown className='text-primary' />
          )}
        </div>

        {isDropdownOpen && (
          <div className='absolute top-full mt-2 z-10 bg-white rounded-[10px] w-[93px] shadow-xl'>
            <ul className='px-3 py-3'>
              {months.map((month) => (
                <li
                  key={month}
                  className='text-[16px] text-primary font-medium cursor-pointer hover:bg-gray-100 hover:font-bold'
                  onClick={() => handleSelectMonth(month)}>
                  {month}월
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 추가 + 오늘 버튼 */}
        <div className='flex flex-row gap-22'>
          <div
            onClick={() => setIsModalOpen(true)}
            className='sm:w-38 sm:h-38 w-30 h-30 flex items-center justify-center border border-primary rounded-full hover:bg-gray-100 cursor-pointer'>
            <Plus className='sm:w-20 sm:h-20 w-15 h-15' />
          </div>
          <button className='text-primary-3 border-[1px] rounded-[10px] sm:text-xl text-[16px] sm:px-50 sm:py-5 px-20 hover:bg-gray-100 cursor-pointer'>
            오늘
          </button>
        </div>

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
                  onClick={(selectedDate) => {
                    setModalStep('ticketAdd');
                    setSelectedDate(selectedDate);
                  }}
                />
              </motion.div>
            ) : (
              <div className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[600px]'>
                <TicketAddModal
                  setShowCameraModal={() => setShowCameraModal(true)}
                  onComplete={(imageUrl: string) => {
                    navigate('/archive/write', {
                      state: {
                        mode: 'create',
                        selectedDate,
                        imageUrl,
                      },
                    });
                    closeModal();
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* 달력 */}
      <div className='w-full flex justify-center mt-20'>
        <div className='w-[1000px]'>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            date={new Date(selectedYear, selectedMonth - 1, 1)}
            views={['month']}
            defaultView='month'
            style={{height: 600}}
            toolbar={false}
            components={{
              month: {
                header: CustomWeekHeader,
                dateHeader: (props) => (
                  <CustomDateHeader
                    {...props}
                    events={events}
                    onDateClick={handleDateClick}
                  />
                ),
                event: () => null,
              },
            }}
            onSelectEvent={(event) => {
              // 선택한 이벤트 수정 페이지로 이동
              navigate('/archive/write', {
                state: {
                  mode: 'edit',
                  existingRecord: event,
                  imageUrl: event.imageUrl,
                },
              });
            }}
          />
        </div>
      </div>

      {showCameraModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <CameraUnavailableModal onClose={() => setShowCameraModal(false)} />
        </div>
      )}
    </div>
  );
};

export default ArchiveCalendar;
