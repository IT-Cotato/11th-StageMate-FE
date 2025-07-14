import Logo from '@/assets/logos/main-logo.svg?react';
import HeaderBackground from '@/assets/main-header-bg/header-bg.svg?url';
import User from '@/assets/users/user.svg?react';
import Bell from '@/assets/alerts-feedback/bell.svg?react';
import SearchBox from './SearchBox';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';

interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
}

const Header = ({isLoggedIn, username}: HeaderProps) => {
  const headerHeight = isLoggedIn ? 'h-[318px]' : '[h-285px]';
  return (
    <div
      className={`w-full ${headerHeight} rounded-b-[50px] p-[15px] flex flex-col relative z-10 gap-[12px] bg-cover`}
      style={{
        backgroundImage: `url("${HeaderBackground}")`,
      }}>
      <div className='flex justify-between items-center'>
        <Logo />
        <div className='gap-[18px] flex flex-row'>
          <Bell className='cursor-pointer' />
          <User className='cursor-pointer' />
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

export default Header;
