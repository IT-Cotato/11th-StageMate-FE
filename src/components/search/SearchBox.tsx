import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Search from '@/assets/search.svg?react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import SearchPopularDropdown from './SearchPopularDropdown';
import useClickOutside from '@/hooks/useClickOutside';

type SearchBoxVariant = 'main' | 'community';

interface SearchBoxProps {
  variant?: SearchBoxVariant;
}

const SearchBox = ({variant = 'main'}: SearchBoxProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) {
      navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleDoubleClick = () => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      navigate('/search');
    } else {
      handleSearch();
    }
  };

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  useClickOutside({
    ref: dropdownRef,
    onClickOutside: () => setIsDropdownOpen(false),
    exclude: (target) =>
      target.closest('input') !== null || target.closest('svg') !== null,
  });

  const variantStyles = {
    main: {
      wrapper:
        'w-full max-w-full sm:h-[50px] h-40 bg-white flex flex-row items-center rounded-[10px] px-20',
      input: 'w-full flex-1 focus:outline-none text-[16px] px-20 text-gray',
    },
    community: {
      wrapper:
        'w-full max-w-[300px] h-[52px] flex flex-row items-center rounded-[3px] px-[17px] ml-20',
      input: 'w-full flex-1 focus:outline-none text-[16px] px-20 text-gray',
    },
  };

  return (
    <div
      className={`relative ${variantStyles[variant].wrapper}`}
      onDoubleClick={handleDoubleClick}>
      <Search
        className='text-gray-2 shrink-0 sm:w-25 w-20'
        onClick={handleSearch}
      />
      <input
        type='text'
        placeholder='오늘의 추천 검색어'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className={variantStyles[variant].input}
      />
      <ChevronDown
        className={`cursor-pointer text-gray-2 shrink-0 sm:w-25 w-20 transition-transform duration-300 ${
          isDropdownOpen ? 'rotate-180' : 'rotate-0'
        }`}
        onClick={handleDropdown}
      />

      <div
        className={`absolute top-[calc(100%-15px)] right-0 transition-all duration-300 ease-in-out overflow-visible z-90 ${
          isDropdownOpen
            ? 'opacity-100 translate-y-0 max-h-96'
            : 'opacity-0 -translate-y-2 max-h-0'
        }`}>
        <div
          className='bg-white rounded-b-[10px] w-290 shadow-xs'
          ref={dropdownRef}>
          <SearchPopularDropdown isDropdownOpen />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
