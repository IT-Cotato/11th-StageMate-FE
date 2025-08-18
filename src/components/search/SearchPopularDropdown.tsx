import {useSearchPopular} from '@/hooks/useSearchResults';
import {format, parseISO} from 'date-fns';
import '@/styles/skeleton.css';

const formatTime = (isoTime?: string) => {
  if (!isoTime) return '';
  const date = parseISO(isoTime);
  return format(date, 'yyyy.MM.dd HH:mm') + ' 기준';
};

interface SearchPopularDropdownProps {
  isDropdownOpen: boolean;
}
const SearchPopularDropdown = ({
  isDropdownOpen,
}: SearchPopularDropdownProps) => {
  const {data, isLoading, isError} = useSearchPopular(isDropdownOpen);

  if (isLoading) {
    return (
      <div className='bg-white rounded-[10px] flex flex-col p-10'>
        <div className='flex flex-row justify-between items-center mb-2'>
          실시간 인기 검색어
        </div>
        <ul className='mt-2 grid grid-rows-5 grid-flow-col gap-2 p-4'>
          {Array.from({length: 10}).map((_, idx) => (
            <li key={idx} className='h-10 w-48 rounded skeleton-shimmer'></li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='bg-white rounded-[10px] flex flex-col p-10'>
        <p className='text-red-500 text-[11px]'>
          인기 검색어를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }
  return (
    <div className='bg-white rounded-[10px] flex flex-col p-10'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-[16px] font-medium'>실시간 인기 검색어</h1>
        <span className='text-gray-2 text-[13px]'>
          {formatTime(data?.data.time)}
        </span>
      </div>
      <ul className='mt-2 flex flex-col gap-2 p-4'>
        {data?.data?.keywords?.length ? (
          data.data.keywords.map((keyword, idx) => (
            <li key={idx}>
              <div className='text-[14px] w-80 truncate'>
                {idx + 1}. {keyword}
              </div>
            </li>
          ))
        ) : (
          <li className='text-gray-2 text-[12px]'>
            현재 인기 검색어가 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
};

export default SearchPopularDropdown;
