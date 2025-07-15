import Search from '@/assets/search.svg?react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';

const SearchBox = () => {
  return (
    <div className='relative w-full max-w-full h-[50px] bg-white flex flex-row items-center rounded-[10px] px-[20px]'>
      <Search className='text-gray-2 shrink-0 ' />
      <input
        type='text'
        placeholder='오늘의 추천 검색어'
        className='w-full flex-1 focus:outline-none text-[20px] px-[20px] text-gray'
      />
      <ChevronDown className='cursor-pointer text-gray-2  shrink-0' />
    </div>
  );
};

export default SearchBox;
