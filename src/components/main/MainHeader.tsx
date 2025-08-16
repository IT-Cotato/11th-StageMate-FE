import Logo from '@/assets/logos/main-logo.svg?react';
import HeaderBackground from '@/assets/main-header-bg/header-bg.svg?url';
import User from '@/assets/users/user.svg?react';
import Bell from '@/assets/alerts-feedback/bell.svg?react';
import SearchBox from '../search/SearchBox';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';
import {useNavigate} from 'react-router-dom';

interface MainHeaderProps {
  isLoggedIn: boolean;
  username?: string;
}

const MainHeader = ({isLoggedIn, username}: MainHeaderProps) => {
  const headerHeight = isLoggedIn ? 'sm:h-[318px] h-250' : 'sm:h-[285px] h-240';
  const navigate = useNavigate();
  return (
    <div
      className={`w-full ${headerHeight} rounded-b-[50px] py-15 px-20 flex flex-col relative z-10 gap-[12px] bg-cover`}
      style={{
        backgroundImage: `url("${HeaderBackground}")`,
      }}>
      <div className='flex justify-between items-center'>
        <Logo className='sm:w-150 w-120' />
        <div className='gap-[18px] flex flex-row'>
          <Bell
            className='cursor-pointer sm:w-30 sm:h-30 w-25 h-25'
            onClick={() => navigate('/notification')}
          />
          <User className='cursor-pointer sm:w-30 sm:h-30 w-25 h-25' />
        </div>
      </div>

      <SearchBox />
      {isLoggedIn ? (
        <LoggedInHeader username={username} />
      ) : (
        <LoggedOutHeader />
      )}
    </div>
  );
};

export default MainHeader;
