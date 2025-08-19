import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import Plus from '@/assets/archive/archive-plus.svg?react';
import {motion} from 'framer-motion';
import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SelectDateModal from '../modal/SelectDateModal';
import TicketAddModal from '../modal/TicketAddModal';
import CameraUnavailableModal from '../modal/CameraUnavailableModal';
import CalendarLayout from '../calendar/CalendarLayout';
import '@/styles/react-big-calendar-custom.css';
import {useCalendarStore} from '@/stores/useCalendarStore';
import {useArchive} from '@/hooks/useArchive';
import {useArchiveStore} from '@/stores/useArchiveStore';
import useClickOutside from '@/hooks/useClickOutside';

const ArchiveCalendar = () => {
  const navigate = useNavigate();
  const today = new Date();

  const {year, month, setYearMonth} = useCalendarStore();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [modalStep, setModalStep] = useState<'selectDate' | 'ticketAdd'>(
    'selectDate'
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useArchive();
  const records = useArchiveStore((state) => state.records);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const months = Array.from({length: 12}, (_, i) => i + 1);

  const handleSelectMonth = (selectedMonth: number) => {
    const updatedDate = new Date(year, selectedMonth - 1, 1);
    setCurrentDate(updatedDate);
    setYearMonth(year, selectedMonth);
    setIsDropdownOpen(false);
  };
  useClickOutside({
    ref: dropdownRef,
    onClickOutside: () => {
      if (isDropdownOpen) toggleDropdown();
    },
  });

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

  const events = records.map((record) => ({
    id: record.id,
    title: record.title,
    start: new Date(record.viewingDate),
    end: new Date(record.viewingDate),
    imageUrl: record.imageUrl,
  }));

  return (
    <div className='w-full flex flex-col' ref={dropdownRef}>
      {/* 헤더 */}
      <div className='relative w-full flex justify-between items-center'>
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => !isModalOpen && toggleDropdown()}>
          <p className='text-[18px] text-primary font-medium'>
            {year}년 {month}월
          </p>
          <ChevronDown
            className={`text-primary transition-transform duration-300 ${
              isDropdownOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>

        {isDropdownOpen && (
          <div className='absolute top-full mt-2 z-10 bg-[#fff] rounded-[10px] w-[93px] shadow-xl'>
            <ul className='px-3 py-3'>
              {months.map((m) => (
                <li
                  key={m}
                  className='text-[16px] text-primary font-medium cursor-pointer hover:bg-gray-100 hover:font-bold'
                  onClick={() => handleSelectMonth(m)}>
                  {m}월
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
                state: {mode: 'edit', archiveId: Number(event.id)},
              });
            }}
            onNavigateDate={(date) => {
              setCurrentDate(date);
              setYearMonth(date.getFullYear(), date.getMonth() + 1);
            }}
          />
        </div>
      </div>

      {/* 모달 */}
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
                onClick={(date) => {
                  setModalStep('ticketAdd');
                  setSelectedDate(date);
                }}
              />
            </motion.div>
          ) : (
            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[600px]'>
              <TicketAddModal
                selectedDate={selectedDate}
                setShowCameraModal={() => setShowCameraModal(true)}
                onComplete={(imageUrl, imageFile) => {
                  navigate('/archive/write', {
                    state: {mode: 'create', selectedDate, imageUrl, imageFile},
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
