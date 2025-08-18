import {useEffect, useState} from 'react';
import CommunityLogo from '@/assets/logos/community-logo.svg?react';
import SearchBox from '../search/SearchBox';
import Bell from '@/assets/alerts-feedback/bell.svg?react';
import User from '@/assets/users/user.svg?react';
import {useNavigate} from 'react-router-dom';
interface GlobalHeaderProps {
  showIcons?: boolean;
}
const GlobalHeader = ({showIcons = false}: GlobalHeaderProps) => {
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
      className={`w-full h-[65px] bg-white flex flex-row items-center justify-between px-40  `}>
      <div
        className={`absolute bottom-0 left-0 w-full bg-gray-200 transition-opacity duration-300 ${hasBorder ? 'opacity-100' : 'opacity-0'}`}
      />
      <CommunityLogo className='w-30' />
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <SearchBox variant='community' />
      </div>

      {showIcons && (
        <div className='flex flex-row gap-18'>
          <Bell
            className='w-25 cursor-pointer'
            onClick={() => navigate('/notification')}
          />
          <User
            className='w-25 cursor-pointer'
            onClick={() => navigate('/settings')}
          />
        </div>
      )}
    </div>
  );
};

export default GlobalHeader;
