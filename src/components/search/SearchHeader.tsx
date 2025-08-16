import Logo from '@/assets/logos/main-logo.svg?react';
import {useEffect, useState} from 'react';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import {useNavigate} from 'react-router-dom';

const SearchHeader = () => {
  const [hasBorder, setHasBorder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setHasBorder(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 max-w-[600px] w-full h-[120px] bg-white z-50 flex items-center justify-between px-20 transition-shadow duration-300 ${hasBorder ? 'shadow-2xs bg-white/95' : ''}`}>
      <div
        className={`absolute bottom-0 left-0 w-full bg-gray-200 transition-opacity duration-300 ${hasBorder ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className='flex flex-col gap-10'>
        <Logo className='sm:w-150 w-120' />
        <div className='flex flex-row items-center text-center '>
          <ChevronLeft
            className='w-40 h-40 text-gray cursor-pointer'
            onClick={() => navigate(-1)}
          />
          <span className='absolute left-1/2 -translate-x-1/2 text-xl '>
            빠른 검색창
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
