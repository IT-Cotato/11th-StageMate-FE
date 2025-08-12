import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import ChevronUp from '@/assets/chevrons/chevron-up.svg?react';
import Plus from '@/assets/archive/archive-plus.svg?react';
import {motion} from 'framer-motion';
import {useMemo, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SelectDateModal from '../modal/SelectDateModal';
import TicketAddModal from '../modal/TicketAddModal';
import CameraUnavailableModal from '../modal/CameraUnavailableModal';
import {useArchiveStore} from '@/stores/useArchiveStore';
import CalendarLayout from '../calendar/CalendarLayout';
import '@/styles/react-big-calendar-custom.css';

const ArchiveCalendar = () => {
  const navigate = useNavigate();
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [modalStep, setModalStep] = useState<'selectDate' | 'ticketAdd'>(
    'selectDate'
  );

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const months = Array.from({length: 12}, (_, i) => i + 1);

  const handleSelectMonth = (month: number) => {
    const updatedDate = new Date(selectedYear, month - 1, 1);
    setSelectedMonth(month);
    setCurrentDate(updatedDate);
    setIsDropdownOpen(false);
  };

  const handleDateClick = (date: Date) => {
    window.scrollTo(0, 0);
    setSelectedDate(date);
    setModalStep('ticketAdd');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep('selectDate');
  };

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

  return (
    <div className='w-full flex flex-col' ref={dropdownRef}>
      {/* 헤더 */}
      <div className='relative w-full flex justify-between items-center'>
        <div
          className='flex items-center gap-1 cursor-pointer'
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

        {/* 기록하기 버튼 */}

        <div
          onClick={() => setIsModalOpen(true)}
          className='flex flex-row gap-10 items-center justify-center border border-primary text-primary rounded-[20px] hover:font-bold cursor-pointer px-10 py-5 shadow-xs'>
          <Plus className='w-15 h-15' />
          <span>기록하기</span>
        </div>
      </div>

      {/* 달력 */}
      <div className='w-full flex justify-center mt-20'>
        <div className='w-[1000px]'>
          <CalendarLayout
            events={events}
            selectedDate={selectedDate}
            currentDate={currentDate}
            onDateClick={handleDateClick}
            onEventClick={(event) => {
              navigate('/archive/write', {
                state: {
                  mode: 'edit',
                  existingRecord: event,
                  imageUrl: event.imageUrl,
                },
              });
            }}
            onNavigateDate={(date) => {
              setCurrentDate(date);
              setSelectedYear(date.getFullYear());
              setSelectedMonth(date.getMonth() + 1);
            }}
          />
        </div>
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
              onDragEnd={(_, info) => {
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

      {showCameraModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <CameraUnavailableModal onClose={() => setShowCameraModal(false)} />
        </div>
      )}
    </div>
  );
};

export default ArchiveCalendar;
