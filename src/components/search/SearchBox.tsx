import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Search from '@/assets/search.svg?react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';

type SearchBoxVariant = 'main' | 'community';

interface SearchBoxProps {
  variant?: SearchBoxVariant;
}

const SearchBox = ({variant = 'main'}: SearchBoxProps) => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

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

  const variantStyles = {
    main: {
      wrapper:
        'w-full max-w-full h-[50px] bg-white flex flex-row items-center rounded-[10px] px-20',
      input: 'w-full flex-1 focus:outline-none text-xl px-20 text-gray',
    },
    community: {
      wrapper:
        'w-full max-w-[325px] h-[52px] flex flex-row items-center rounded-[3px] px-[17px]',
      input: 'w-full flex-1 focus:outline-none text-[16px] px-20 text-gray',
    },
  };

  return (
    <div
      className={`relative ${variantStyles[variant].wrapper}`}
      onDoubleClick={handleDoubleClick}>
      <Search className='text-gray-2 shrink-0' onClick={handleSearch} />
      <input
        type='text'
        placeholder='오늘의 추천 검색어'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className={variantStyles[variant].input}
      />
      <ChevronDown className='cursor-pointer text-gray-2  shrink-0' />
    </div>
  );
};

export default SearchBox;
