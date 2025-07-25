import Search from '@/assets/search.svg?react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import RatingInput from '../../components/archive/RatingInput';
import {useEffect, useRef, useState} from 'react';
import CustomDatePicker from '@/components/global/CustomDatePicker';
import {useArchiveStore} from '@/stores/useArchiveStore';
import {v4 as uuidv4} from 'uuid';
import type {RecordType} from '@/stores/useArchiveStore';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import ChevronUp from '@/assets/chevrons/chevron-up.svg?react';

const ArchiveWritePage = () => {
  const {id} = useParams<{id: string}>();
  const isEditMode = Boolean(id);

  const location = useLocation();
  const navigate = useNavigate();

  // zustand에서 기존 기록 찾기 (수정 모드용)
  const existingRecord = useArchiveStore((state) =>
    state.records.find((record) => record.id === id)
  );

  // 추가 모드에서 선택한 날짜, 이미지
  const selectedDateFromState = location.state?.selectedDate;
  const imageUrlFromState = location.state?.imageUrl;

  // Zustand 함수들
  const addRecord = useArchiveStore((state) => state.addRecord);
  const updateRecord = useArchiveStore((state) => state.updateRecord);

  // 상태 초기화
  const [startDate, setStartDate] = useState<Date | null>(() => {
    if (isEditMode && existingRecord) return new Date(existingRecord.date);
    if (!isEditMode && selectedDateFromState)
      return new Date(selectedDateFromState);
    return null;
  });

  const [title, setTitle] = useState(() =>
    isEditMode && existingRecord ? existingRecord.title : ''
  );
  const [place, setPlace] = useState(() =>
    isEditMode && existingRecord ? existingRecord.place || '' : ''
  );
  const [casting, setCasting] = useState(() =>
    isEditMode && existingRecord ? existingRecord.casting || '' : ''
  );
  const [rating, setRating] = useState(() =>
    isEditMode && existingRecord ? existingRecord.rating || 0 : 0
  );
  const [review, setReview] = useState(() =>
    isEditMode && existingRecord ? existingRecord.review || '' : ''
  );
  const [memo, setMemo] = useState(() =>
    isEditMode && existingRecord ? existingRecord.memo || '' : ''
  );

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 저장 핸들러
  const handleRecord = () => {
    if (!title) {
      alert('공연명은 필수입니다.');
      return;
    }
    if (!startDate) {
      alert('관람일시는 필수입니다.');
      return;
    }

    const record: RecordType = {
      id: isEditMode && existingRecord ? existingRecord.id : uuidv4(),
      title,
      date: startDate!,
      place,
      casting,
      rating,
      review,
      memo,
      imageUrl: existingRecord?.imageUrl || imageUrlFromState,
    };

    if (isEditMode) {
      updateRecord(record);
      console.log('수정된 기록:', record);
    } else {
      addRecord(record);
      console.log('새 기록 추가:', record);
    }

    navigate('/archive'); // 저장 후 아카이브 목록으로 이동
  };

  return (
    <div className='flex flex-col justify-center gap-40 px-50'>
      {/* 상단 */}
      <div className='flex flex-row justify-between items-center'>
        <h1 className='font-bold text-[25px]'>공연 기록</h1>
        <div className='flex flex-row gap-12'>
          {isEditMode ? (
            <button
              className='flex w-[62px] h-[32px] justify-center items-center border-[1px] border-primary rounded-[50px] text-[16px] hover:font-semibold active:font-semibold cursor-pointer'
              onClick={handleRecord}>
              수정
            </button>
          ) : (
            <button
              className='flex w-[62px] h-[32px] justify-center items-center border-[1px] border-primary rounded-[50px] text-[16px] hover:font-semibold active:font-semibold cursor-pointer'
              onClick={handleRecord}>
              기록
            </button>
          )}
        </div>
      </div>

      {/* 공연 검색 */}
      <div className='flex flex-row justify-between bg-gray-200 sm:h-50 h-35 w-full px-10 py-17 items-center rounded-[15px] shadow-md cursor-pointer'>
        <input
          type='text'
          placeholder='공연 검색하기'
          className='sm:text-xl text-sm outline-none text-gray-2'
        />
        <Search
          className='text-gray-2'
          onClick={() => console.log('공연 검색 결과 화면으로 이동')}
        />
      </div>

      {/* 이미지 영역 */}
      {(existingRecord?.imageUrl || imageUrlFromState) && (
        <div className='w-full flex items-center justify-center'>
          <img
            src={existingRecord?.imageUrl || imageUrlFromState}
            alt='선택된 티켓 이미지'
            className='w-[224px] h-[289px]'
          />
        </div>
      )}

      {/* 입력 폼 */}
      <div className='flex flex-col gap-40'>
        {/* 공연명 */}
        <div className='flex flex-row items-center gap-10 justify-center text-center'>
          <label className='w-[100px] sm:text-2xl text-xl font-medium'>
            공연명
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='공연명을 입력하세요.'
            className='flex-1 sm:max-w-[200px] max-w-[120px] border-b-[1px] border-primary outline-none sm:text-xl text-sm py-2 placeholder:text-gray-400'
          />
        </div>

        {/* 관람일시 */}
        <div className='flex flex-row items-center gap-10 justify-center text-center relative'>
          <label className='w-[100px] sm:text-2xl text-xl font-medium'>
            관람일시
          </label>

          {isEditMode && (
            <button onClick={() => setIsOpen((prev) => !prev)}>
              {isOpen ? (
                <ChevronDown className='cursor-pointer' />
              ) : (
                <ChevronUp className='cursor-pointer' />
              )}
            </button>
          )}

          <input
            type='text'
            placeholder='날짜를 선택하세요.'
            value={startDate ? startDate.toLocaleDateString() : ''}
            className='flex-1 sm:max-w-[200px] max-w-[120px] border-b-[1px] border-primary outline-none sm:text-xl text-sm py-2 placeholder:text-gray-400 cursor-pointer'
            onClick={() => setIsOpen((prev) => !prev)}
            readOnly
          />

          {isOpen && isEditMode && (
            <div className='absolute top-full mt-2 z-50' ref={wrapperRef}>
              <CustomDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                setIsOpen={setIsOpen}
              />
            </div>
          )}
        </div>

        {/* 장소 */}
        <div className='flex flex-row items-center gap-10 justify-center text-center'>
          <label className='w-[100px] sm:text-2xl text-xl font-medium'>
            장소
          </label>
          <input
            type='text'
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder='장소를 입력하세요.'
            className='flex-1 sm:max-w-[200px] max-w-[120px] border-b-[1px] border-primary outline-none sm:text-xl text-sm py-2 placeholder:text-gray-400'
          />
        </div>

        {/* 출연 */}
        <div className='flex flex-row items-center gap-10 justify-center text-center'>
          <label className='w-[100px] sm:text-2xl text-xl font-medium'>
            출연
          </label>
          <input
            type='text'
            value={casting}
            onChange={(e) => setCasting(e.target.value)}
            placeholder='출연진을 입력하세요.'
            className='flex-1 sm:max-w-[200px] max-w-[120px] border-b-[1px] border-primary outline-none sm:text-xl text-sm py-2 placeholder:text-gray-400'
          />
        </div>

        {/* 별점 */}
        <div className='flex flex-row items-center justify-center text-center sm:ml-25 ml-20'>
          <label className='w-[100px] sm:text-2xl text-xl font-medium'>
            별점
          </label>
          <RatingInput rating={rating} setRating={setRating} />
        </div>

        {/* 감상평 */}
        <div className='flex flex-col gap-10'>
          <span className='sm:text-2xl text-xl font-medium'>감상평</span>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder='감상평을 입력하세요.'
            rows={5}
            className='w-full resize-none bg-white rounded-[10px] p-4 text-base leading-relaxed outline-none text-gray-800 placeholder:text-gray-400'
            style={{boxShadow: 'inset 0 3px 7px rgba(0, 0, 0, 0.06)'}}
          />
        </div>

        {/* 메모 */}
        <div className='flex flex-col gap-10'>
          <span className='sm:text-2xl text-xl font-medium'>메모</span>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder='메모를 입력하세요.'
            rows={5}
            className='w-full resize-none bg-white rounded-[10px] p-4 text-base leading-relaxed outline-none placeholder:text-gray-400'
            style={{boxShadow: 'inset 0 3px 7px rgba(0, 0, 0, 0.06)'}}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchiveWritePage;
