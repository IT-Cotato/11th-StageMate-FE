import {useEffect, useState} from 'react';
import CommunityLogo from '@/assets/logos/community-logo.svg?react';
import Bell from '@/assets/alerts-feedback/bell.svg?react';
import User from '@/assets/users/user.svg?react';
import SearchBox from '../../search/SearchBox';

const CommunityMainHeader = () => {
  const [hasBorder, setHasBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasBorder(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-[65px] bg-white flex flex-row items-center justify-between px-20 transition-shadow duration-300 ${hasBorder ? 'shadow-2xs bg-white/95' : ''}`}>
      <div
        className={`absolute bottom-0 left-0 w-full bg-gray-200 transition-opacity duration-300 ${hasBorder ? 'opacity-100' : 'opacity-0'}`}
      />
      <CommunityLogo className='w-37' />
      <SearchBox variant='community' />
      <div className='flex flex-row gap-18'>
        <Bell className='cursor-pointer sm:w-30 sm:h-30 w-25 h-25' />
        <User className='cursor-pointer sm:w-30 sm:h-30 w-25 h-25' />
      </div>
    </div>
  );
};

export default CommunityMainHeader;
