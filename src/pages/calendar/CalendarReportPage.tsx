import {useOutletContext, useNavigate} from 'react-router-dom';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useEffect, useMemo, useState} from 'react';
import {useReportFormStore} from '@/stores/useReportFormStore';
import ButtonFill from '@/components/global/ButtonFill';
import SelectDateModal from '@/components/modal/SelectDateModal';
import SelectGenreModal from '@/components/modal/SelectGenreModal';
import ChevronUp from '@/assets/chevrons/chevron-up.svg?react';
import TagBadge from '@/components/global/TagBadge';
import {createPerformanceSchedule} from '@/api/performanceSchedulePrivateApi';
import type {PerformanceScheduleCreateRequest} from '@/types/schedule';
import {isAxiosError} from 'axios';

interface ApiErrorBody {
  errorCode?: string;
  code?: string;
  message?: string;
  [k: string]: unknown;
}

// 날짜 포맷 유틸
const toYMD = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// 같은 날 기준 시작/종료 시각을 ISO로
const toISOAt = (date: Date, time = '19:00') => {
  const [h, m] = time.split(':').map(Number);
  const d = new Date(date);
  d.setHours(h ?? 0, m ?? 0, 0, 0);
  return d.toISOString();
};

// 한글 장르명을 영문 타입으로 매핑
const toCategory = (g: string): 'MUSICAL' | 'PLAY' | 'ETC' => {
  switch (g) {
    case '창작 뮤지컬':
    case '오리지널/내한 뮤지컬':
    case '라이선스 뮤지컬':
    case '넌버벌 퍼포먼스':
    case '아동/가족 뮤지컬':
      return 'MUSICAL';
    case '코미디':
    case '드라마':
    case '스릴러':
    case '로맨스':
    case '가족':
    case '판타지':
      return 'PLAY';
    default:
      return 'ETC';
  }
};

const CalendarReportPage = () => {
  const {setHeaderProps} = useOutletContext<{
    setHeaderProps: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
  }>();
  const navigate = useNavigate();

  const {form, setForm, setDate, resetForm, toggleGenre} = useReportFormStore();
  const [description, setDescription] = useState(form.description ?? '');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setHeaderProps({
      title: '공연 일정 제보하기',
      showHomeIcon: false,
      showBottomLine: false,
    });
  }, [setHeaderProps]);

  // 전송용 장르 enum 배열
  const categoryTypes = useMemo<('MUSICAL' | 'PLAY' | 'ETC')[]>(
    () => (form.genre ?? []).map((g) => toCategory(String(g))),
    [form.genre]
  );

  const handleSubmit = async () => {
    // 누락 필드 검사 (ID 기준)
    const missing: string[] = [];
    if (!form.title) missing.push('제목');
    if (!description) missing.push('설명');
    if (!form.date) missing.push('날짜');
    if (categoryTypes.length === 0) missing.push('장르');
    if (!form.performanceId) missing.push('공연');
    if (!form.theaterId) missing.push('장소');

    if (missing.length > 0) {
      alert(`필수값 미입력: ${missing.join(', ')}`);
      return;
    }

    if (!form.title) return;
    const date = form.date as Date;
    const performanceId = form.performanceId!;
    const theaterId = form.theaterId!;

    console.log('[REPORT] submit payload preview', {
      title: form.title,
      performanceId,
      theaterId,
      categoryTypes,
      scheduleDate: toYMD(date),
      scheduleDateStartTime: toISOAt(date, '19:00'),
      scheduleDateEndTime: toISOAt(date, '21:30'),
      reportDate: new Date().toISOString(),
      url: form.url ?? '',
    });

    const payload: PerformanceScheduleCreateRequest = {
      title: form.title,
      content: description,
      url: form.url ?? '',
      performanceId,
      theaterId,
      scheduleDate: toYMD(date),
      scheduleDateStartTime: toISOAt(date, '19:00'),
      scheduleDateEndTime: toISOAt(date, '21:30'),
      reportDate: new Date().toISOString(),
      performanceScheduleCategoryTypes: categoryTypes,
    };

    try {
      setSubmitting(true);
      await createPerformanceSchedule(payload);
      resetForm();
      alert('제보가 등록되었습니다.');
      navigate(-1);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const status = err.response?.status;
        const body = err.response?.data as ApiErrorBody | undefined;
        console.error('Create schedule failed', {status, body, payload});
        const friendly =
          status === 400
            ? '입력값을 다시 확인해 주세요.'
            : '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        alert(friendly);
      } else {
        console.error('Unknown error', err);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='w-full max-w-[1000px] mx-auto'>
      <div className='w-full pt-16 rounded-[10px] flex flex-col gap-20'>
        {/* 공연 제목 */}
        <input
          type='text'
          value={form.title ?? ''}
          onChange={(e) => setForm({title: e.target.value})}
          maxLength={100}
          className='bg-gray-1 placeholder:text-gray-2 px-17 py-16 rounded-[10px]'
          placeholder='공연 제목을 입력해주세요(필수)'
        />

        {/* 설명 */}
        <div className='flex flex-col gap-7'>
          <textarea
            value={description}
            onChange={(e) => {
              const v = e.target.value;
              setDescription(v);
              setForm({description: v});
            }}
            className='rounded-[10px] bg-gray-1 placeholder:text-gray-2 border-0 resize-none px-17 pt-16 h-[260px]'
            placeholder='제보할 공식 일정을 설명해 주세요(필수)'
          />
          <div className='flex justify-between font-semibold text-base text-black px-2'>
            <span>글자수</span>
            <span>{description.length}/100</span>
          </div>
        </div>

        {/* 장소(선택 페이지로 이동) */}
        <div
          onClick={() => navigate('/calendar/report/location')}
          className='px-17 py-16 rounded-[10px] bg-gray-1 border-0 text-left cursor-pointer'>
          {form.location ? (
            <span className='text-black'>{form.location}</span>
          ) : (
            <span className='text-gray-2'>장소를 입력해주세요.</span>
          )}
        </div>

        {/* URL */}
        <input
          type='text'
          value={form.url ?? ''}
          onChange={(e) => setForm({url: e.target.value})}
          placeholder='관련 URL을 입력해주세요.'
          className='px-17 py-16 rounded-[10px] bg-gray-1 placeholder:text-gray-2 border-0'
        />

        {/* 공연(선택 페이지로 이동) */}
        <div
          onClick={() => navigate('/calendar/report/performance')}
          className='px-17 py-16 rounded-[10px] bg-gray-1 border-0 text-left cursor-pointer'>
          {form.performance ? (
            <span className='text-black'>{form.performance}</span>
          ) : (
            <div className='flex justify-between'>
              <span className='text-gray-2'>관련 공연을 선택해 주세요.</span>
              <ChevronUp className='text-gray-2' />
            </div>
          )}
        </div>

        {/* 날짜 선택 */}
        <div
          onClick={() => setIsDateModalOpen(true)}
          className='px-17 py-16 rounded-[10px] bg-gray-1 border-0 text-left cursor-pointer'>
          {form.date ? (
            <span className='text-black'>{form.date.toLocaleDateString()}</span>
          ) : (
            <div className='flex justify-between'>
              <span className='text-gray-2'>날짜를 입력해주세요.</span>
              <ChevronUp className='text-gray-2' />
            </div>
          )}
        </div>

        {/* 장르 선택 */}
        <div
          onClick={() => setIsGenreModalOpen(true)}
          className='px-[17px] py-[16px] rounded-[10px] bg-gray-1 border-0 text-left cursor-pointer'>
          {form.genre && form.genre.length > 0 ? (
            <div className='flex flex-wrap gap-[10px] pointer-events-none'>
              {form.genre.map((g) => (
                <TagBadge
                  key={String(g)}
                  label={`#${String(g)}`}
                  size='large'
                  variant='filled'
                />
              ))}
            </div>
          ) : (
            <div className='flex justify-between'>
              <span className='text-gray-2'>카테고리를 선택해주세요.</span>
              <ChevronUp className='text-gray-2' />
            </div>
          )}
        </div>

        {/* 제출 버튼 */}
        <ButtonFill
          text={submitting ? '제보 중...' : '제보하기'}
          onClick={handleSubmit}
        />
      </div>

      {/* 모달들 */}
      <div className='fixed bottom-0 left-1/2 -translate-x-1/2 z-40 rounded-[10px] w-full max-w-[600px]'>
        {isDateModalOpen && (
          <SelectDateModal
            onClick={(selectedDate) => {
              setDate(selectedDate);
              setIsDateModalOpen(false);
            }}
            onClose={() => setIsDateModalOpen(false)}
          />
        )}
        {isGenreModalOpen && (
          <SelectGenreModal
            selectedGenre={form.genre ?? []}
            setSelectedGenre={toggleGenre}
            onClose={() => setIsGenreModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarReportPage;
