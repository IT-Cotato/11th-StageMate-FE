import {useRef, useState} from 'react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import {performanceGenre} from '@/constant';
import useClickOutside from '@/hooks/useClickOutside';

type Props = {
  selectedMainCategory: '전체' | '뮤지컬' | '연극';
  setSelectedMainCategory: (cat: '전체' | '뮤지컬' | '연극') => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (cat: string | null) => void;
};

const PerformanceCategoryDropdown = ({
  selectedMainCategory,
  setSelectedMainCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stage, setStage] = useState<'main' | 'sub'>('main');
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setIsDropdownOpen((prev) => !prev);
    setStage('main');
  };

  const handleMainCategoryClick = (category: '뮤지컬' | '연극') => {
    setSelectedMainCategory(category);
    setStage('sub');
  };

  const handleSubCategoryClick = (sub: string) => {
    setSelectedSubCategory(sub);
    setIsDropdownOpen(false);
  };

  const handleBackToMain = () => {
    setStage('main');
  };

  useClickOutside({
    ref: dropdownRef,
    onClickOutside: () => setIsDropdownOpen(false),
  });

  const renderDropdown = () => {
    if (stage === 'main') {
      return (
        <>
          {['뮤지컬', '연극'].map((category) => (
            <button
              key={category}
              onClick={(e) => {
                e.stopPropagation();
                handleMainCategoryClick(category as '뮤지컬' | '연극');
              }}
              className='w-full text-left px-4 py-2 hover:font-bold text-[12px]'>
              {category}
            </button>
          ))}
        </>
      );
    }

    if (stage === 'sub' && selectedMainCategory !== '전체') {
      return (
        <>
          {performanceGenre[selectedMainCategory]?.map((sub) => (
            <button
              key={sub}
              onClick={(e) => {
                e.stopPropagation();
                handleSubCategoryClick(sub);
              }}
              className='w-full text-left px-4 py-2 hover:font-bold text-[12px]'>
              {sub}
            </button>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBackToMain();
            }}
            className='w-full text-left px-4 py-2 text-gray-500 text-[12px] hover:text-black'>
            이전
          </button>
        </>
      );
    }
  };

  return (
    <div
      className='flex flex-row relative text-primary cursor-pointer justify-end gap-36'
      ref={dropdownRef}
      onClick={toggleDropDown}>
      <span className='text-[18px] font-medium'>
        {selectedSubCategory ?? selectedMainCategory}
      </span>
      <ChevronDown
        className={`chevron-toggle transition-transform duration-300 cursor-pointer ${
          isDropdownOpen ? 'rotate-180' : ''
        }`}
      />
      {isDropdownOpen && (
        <div className='absolute top-full mt-2 right-0 z-10 w-93 rounded-[10px] bg-white shadow-lg border border-gray-200 py-2'>
          {renderDropdown()}
        </div>
      )}
    </div>
  );
};

export default PerformanceCategoryDropdown;
