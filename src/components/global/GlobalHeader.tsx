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
      className={`w-full h-[65px] bg-white flex flex-row items-center pl-40 ${!showIcons ? 'gap-70' : 'justify-between'}`}>
      <div
        className={`absolute bottom-0 left-0 w-full bg-gray-200 transition-opacity duration-300 ${hasBorder ? 'opacity-100' : 'opacity-0'}`}
      />
      <CommunityLogo
        className='w-30 cursor-pointer'
        onClick={() => navigate('/')}
      />

      <div>
        <SearchBox variant='community' />
      </div>

      {showIcons && (
        <div className='flex flex-row gap-18 mr-30'>
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
