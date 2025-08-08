import {useOutletContext} from 'react-router-dom';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useState, useEffect} from 'react';
import {useReportFormStore} from '@/stores/useReportFormStore';
import ButtonFill from '@/components/global/ButtonFill';
import SelectDateModal from '@/components/modal/SelectDateModal';
import SelectGenreModal from '@/components/modal/SelectGenreModal';
import {useNavigate} from 'react-router-dom';
import ChevronUp from '@/assets/chevrons/chevron-up.svg?react';
import TagBadge from '@/components/global/TagBadge';

const CalendarReportPage = () => {
  const {setHeaderProps} = useOutletContext<{
    setHeaderProps: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
  }>();

  useEffect(() => {
    setHeaderProps({
      title: '공연 일정 제보하기',
      showHomeIcon: false,
      showBottomLine: false,
    });
  }, [setHeaderProps]);

  const navigate = useNavigate();
  const {form, setForm, setDate, toggleGenre} = useReportFormStore();
  const [description, setDescription] = useState(form.description ?? '');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

  return (
    <div className='w-full max-w-[1000px] mx-auto'>
      <div className='w-full pt-16 rounded-[10px] flex flex-col gap-20'>
        {/* 공연 제목 */}
        <input
          type='text'
          value={form.title}
          onChange={(e) => setForm({title: e.target.value})}
          maxLength={100}
          className='bg-gray-1 placeholder:text-gray-2 px-17 py-16 rounded-[10px]'
          placeholder='공연 제목을 입력해주세요(필수)'
        />

        {/* 설명 */}
        <div className='flex flex-col gap-7'>
          <textarea
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
              setForm({description: e.target.value});
            }}
            className='rounded-[10px] bg-gray-1  placeholder:text-gray-2 border-0 resize-none px-17 pt-16 h-[260px]'
            placeholder='제보할 공식 일정을 설명해 주세요(필수)'
          />
          <div className='flex justify-between font-semibold text-base text-black px-2'>
            <span>글자수</span>
            <span>{description.length}/100</span>
          </div>
        </div>

        {/* 장소 */}
        <div
          onClick={() => navigate('/calendar/report/location')}
          className='px-17 py-16 h-[260] rounded-[10px] bg-gray-1 border-0 text-left cursor-pointer'>
          {form.location ? (
            <span className='text-black'>{form.location}</span>
          ) : (
            <span className='text-gray-2'>장소를 입력해주세요.</span>
          )}
        </div>

        {/* URL */}
        <input
          type='text'
          value={form.url}
          onChange={(e) => setForm({url: e.target.value})}
          placeholder='관련 URL을 입력해주세요.'
          className='px-17 py-16 rounded-[10px] bg-gray-1  placeholder:text-gray-2 border-0'
        />

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
                  key={g}
                  label={`#${g}`}
                  size='large'
                  variant='filled'
                />
              ))}
            </div>
          ) : (
            <span className='text-gray-2'>카테고리를 선택해주세요.</span>
          )}
        </div>

        {/* 제출 버튼 */}
        <ButtonFill text='제보하기' onClick={() => {}} />
      </div>

      <div className='fixed bottom-0 left-1/2 -translate-x-1/2 z-40 rounded-[10px] w-full max-w-[600px]'>
        {/* 날짜 모달 */}
        {isDateModalOpen && (
          <SelectDateModal
            onClick={(selectedDate) => {
              setDate(selectedDate);
              setIsDateModalOpen(false);
            }}
            onClose={() => setIsDateModalOpen(false)}
          />
        )}
        {/* 장르 모달 */}
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
