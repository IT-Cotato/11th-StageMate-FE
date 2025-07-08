import Logo from '@/assets/logos/main-logo.svg?react';
import User from '@/assets/users/user.svg?react';
import Bell from '@/assets/alerts-feedback/bell.svg?react';
import SearchBox from './SearchBox';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';

interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
}

export default function Header({isLoggedIn, username}: HeaderProps) {
  return (
    <div
      className='w-full h-[368px] rounded-b-[50px] p-[15px] flex flex-col relative z-10'
      style={{
        background:
          'linear-gradient(0deg, #7B4CFA 34.13%, #7B4CFA 74.42%, #CDBFF5 100%)',
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
}
