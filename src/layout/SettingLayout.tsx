import SettingTabBar from '@/components/setting/SettingTabBar';
import {useAuthStore} from '@/stores/authStore';
import {Outlet} from 'react-router-dom';
import UserImg from '@/assets/users/user.svg?react';
import {useState} from 'react';
import ChangeProfileModal from '@/components/modal/ChangeProfileModal';

const SettingLayout = () => {
  const {user} = useAuthStore();
  const [showChangeProfileModal, setShowChangeProfileModal] =
    useState<boolean>(false);

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
          onClick={() => setShowChangeProfileModal(true)}
          className='absolute top-215 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-full w-132 h-132 border-1 border-solid border-primary bg-white_1 cursor-pointer'
          style={{
            backgroundImage: `url(${user?.profileImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <div
          onClick={() => setShowChangeProfileModal(true)}
          className='absolute top-215 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-full w-132 h-132 border-1 border-solid border-primary bg-white_1 overflow-hidden flex justify-center items-center cursor-pointer'>
          <UserImg className='w-100 h-100' />
        </div>
      )}

      {/* modal */}
      {showChangeProfileModal && (
        <ChangeProfileModal
          onBackdropClick={() => setShowChangeProfileModal(false)}
        />
      )}
    </div>
  );
};

export default SettingLayout;
