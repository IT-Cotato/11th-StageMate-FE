import SettingTabBar from '@/components/setting/SettingTabBar';
import {useAuthStore} from '@/stores/authStore';
import {Outlet} from 'react-router-dom';
import UserImg from '@/assets/users/user.svg?react';

const SettingLayout = () => {
  const {user} = useAuthStore();

  return (
    <div className='relative flex flex-col'>
      {/* content */}
      <div className='mt-215 w-full bg-[#fff] py-78 px-36 flex flex-col gap-26'>
        <h1 className='text-[#000] text-[32px] font-bold leading-[140%] text-center'>
          {user?.nickname}
        </h1>
        <SettingTabBar />
        <Outlet />
      </div>

      {/* profile */}
      {user?.profileImageUrl ? (
        <div
          className='absolute top-215 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-full w-132 h-132 border-1 border-solid border-primary bg-white_1'
          style={{
            backgroundImage: `url(${user?.profileImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <div className='absolute top-215 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-full w-132 h-132 border-1 border-solid border-primary bg-white_1 overflow-hidden flex justify-center items-center'>
          <UserImg className='w-100 h-100' />
        </div>
      )}
    </div>
  );
};

export default SettingLayout;
