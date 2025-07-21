import {Link, useLocation} from 'react-router-dom';
import Home from '@/assets/nav-icons/home.svg?react';
import Archive from '@/assets/nav-icons/archive.svg?react';
import Community from '@/assets/nav-icons/community.svg?react';
import Settings from '@/assets/nav-icons/settings.svg?react';

const MainNavigationBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClass = (path: string) =>
    `w-[150px] sm:h-[60px] h-[45px] flex items-center justify-center ${
      currentPath === path ? 'bg-white' : ''
    }`;

  const getIconClass = (path: string) =>
    currentPath === path ? 'text-primary' : 'text-[#918F9D]';

  return (
    <div className='w-full max-w-full sm:h-[60px] h-[45px] flex flex-row items-center bg-black'>
      <Link to='/' className={getLinkClass('/')}>
        <Home
          className={`${getIconClass('/')} w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]`}
        />
      </Link>
      <Link to='/archive' className={getLinkClass('/archive')}>
        <Archive
          className={`${getIconClass('/archive')} w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]`}
        />
      </Link>
      <Link to='/community' className={getLinkClass('/community')}>
        <Community
          className={`${getIconClass('/community')} w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]`}
        />
      </Link>
      <Link to='/settings' className={getLinkClass('/settings')}>
        <Settings
          className={`${getIconClass('/settings')} w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]`}
        />
      </Link>
    </div>
  );
};

export default MainNavigationBar;
