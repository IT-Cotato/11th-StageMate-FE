import Search from '@/assets/search.svg?react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';

export default function SearchBox() {
  return (
    <div className='relative w-full h-[53px] mt-20 bg-[#f2f4f8] border-b-gray-10 flex flex-row items-center'>
      <Search className='absolute left-16 top-1/2 -translate-y-1/2 text-[#697077]' />
      <input
        type='text'
        placeholder='오늘의 추천 검색어'
        className='w-[474px] h-[22px] px-48 py-16 focus:outline-none'
      />
      <ChevronDown className='absolute right-16 cursor-pointer text-[#697077]' />
    </div>
  );
}
