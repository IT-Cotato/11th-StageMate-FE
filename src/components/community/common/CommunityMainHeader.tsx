import CommunityLogo from '@/assets/logos/community-logo.svg?react';
import Bell from '@/assets/alerts-feedback/bell.svg?react';
import User from '@/assets/users/user.svg?react';
import SearchBox from '../../global/SearchBox';

const CommunityMainHeader = () => {
  return (
    <div className='fixed top-0 max-w-[600px] w-full h-[70px] bg-white z-50 flex flex-row items-center justify-between pt-6 px-15'>
      <CommunityLogo />
      <SearchBox variant='community' />
      <div className='flex flex-row gap-18'>
        <Bell className='cursor-pointer' />
        <User className='cursor-pointer' />
      </div>
    </div>
  );
};

export default CommunityMainHeader;
