import SearchHeader from '@/components/search/SearchHeader';
import Search from '@/assets/search.svg?react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import CustomDatePicker from '@/components/global/CustomDatePicker';
import Calendar from '@/assets/datepicker-calendar.svg?react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import {motion, AnimatePresence} from 'framer-motion';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useEffect, useRef, useState} from 'react';
import SelectGenreModal from '@/components/modal/SelectGenreModal';
import useClickOutside from '@/hooks/useClickOutside';
import SearchResults from '@/components/search/SearchResults';
import {useSearchResult} from '@/hooks/useSearchResults';
import {performanceGenreSearchMap} from '@/util/performanceCategory';

const SearchPage = () => {
  const [params] = useSearchParams();
  const keywordFromQuery = params.get('keyword') || '';
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState(keywordFromQuery);

  useClickOutside({
    ref: modalRef,
    onClickOutside: () => setIsGenreOpen(false),
    exclude: (target) => target.closest('.chevron-toggle') !== null,
  });

  const toggleGenre = (genre: string) => {
    setSelectedGenre([genre]);
  };

  const handleToggleGenre = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGenreOpen((prev) => !prev);
  };
  const {data, isLoading, isError, refetch} = useSearchResult({
    keyword: submittedKeyword,
    performanceGenre: selectedGenre[0]
      ? performanceGenreSearchMap[selectedGenre[0]]
      : undefined,
    date: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
  });
  const handleSearch = () => {
    if (!searchKeyword.trim()) return;
    const params = new URLSearchParams();
    params.set('keyword', searchKeyword.trim());
    navigate(`/search?${params.toString()}`);
    setSubmittedKeyword(searchKeyword.trim());
    refetch();
  };
  useEffect(() => {
    if (keywordFromQuery) {
      setSearchKeyword(keywordFromQuery);
      setSubmittedKeyword(keywordFromQuery);
      refetch();
    }
  }, [keywordFromQuery, refetch]);

  return (
    <div className='overflow-x-hidden flex justify-center w-full min-h-screen'>
      <SearchHeader />
      <div className='pt-120 w-full max-w-[600px] px-20 flex flex-col gap-30'>
        {/* 검색 입력 */}
        <span className='text-xl ml-20 font-semibold'>빠른 검색</span>
        <div className='bg-gray-1 rounded-[20px] w-full h-60 flex flex-row px-20 items-center'>
          <input
            type='text'
            className='outline-none w-full'
            placeholder='검색어를 입력해 주세요.'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.key === 'Enter') handleSearch();
              }
            }}
          />
          <Search onClick={handleSearch} className='cursor-pointer' />
        </div>

        {/* 검색어 입력 여부에 따라 조건 렌더링 */}
        {submittedKeyword ? (
          <SearchResults
            data={data?.data}
            isLoading={isLoading}
            isError={isError}
          />
        ) : (
          <>
            {/* 날짜 선택 */}
            <div className='flex flex-col gap-10'>
              {isOpen ? (
                <CustomDatePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  setIsOpen={setIsOpen}
                />
              ) : (
                <div
                  className='bg-[#fff] w-200 rounded-[20px] h-70 flex flex-row items-center pl-30 pr-20 border-[1px] border-gray-1 gap-10 cursor-pointer'
                  onClick={() => setIsOpen(true)}>
                  <Calendar />
                  <span className='ml-10 text-lg font-semibold'>
                    {format(startDate, 'yyyy. MM. dd', {locale: ko})}
                  </span>
                </div>
              )}
            </div>

            {/* 장르 선택 */}
            <div className='flex gap-10 flex-col'>
              <span className='text-xl ml-20 font-semibold'>장르 선택</span>
              <div className='h-60 bg-[#fff] rounded-[20px] flex items-center px-20 justify-between border-gray-1 border-[1px]'>
                <span
                  className={`text-base ${
                    selectedGenre.length > 0 && selectedGenre[0]
                      ? 'text-black'
                      : 'text-gray-2'
                  }`}>
                  {selectedGenre.length > 0 && selectedGenre[0]
                    ? `# ${selectedGenre[0]}`
                    : '장르를 선택해 주세요.'}
                </span>
                <ChevronDown
                  className={`chevron-toggle transition-transform duration-300 cursor-pointer text-gray-2 ${
                    isGenreOpen ? 'rotate-180' : ''
                  }`}
                  onClick={handleToggleGenre}
                />
              </div>

              {/* 장르 선택 모달 */}
              <AnimatePresence>
                {isGenreOpen && (
                  <div
                    className='fixed bottom-0 left-1/2 -translate-x-1/2 z-40 rounded-[10px] w-full max-w-[600px]'
                    ref={modalRef}>
                    <motion.div
                      className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[600px]'
                      initial={{y: 100}}
                      animate={{y: 0}}
                      exit={{y: 100}}
                      transition={{type: 'tween', duration: 0.1}}
                      drag='y'
                      dragElastic={0}
                      dragMomentum={false}
                      dragConstraints={{top: 0, bottom: 100}}
                      onDragEnd={(_, info) => {
                        if (info.point.y > 300) setIsGenreOpen(false);
                      }}>
                      <SelectGenreModal
                        selectedGenre={selectedGenre}
                        setSelectedGenre={toggleGenre}
                        onClose={() => setIsGenreOpen(false)}
                      />
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
