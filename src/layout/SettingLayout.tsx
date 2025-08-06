import SettingTabBar from '@/components/mypage/SettingTabBar';
import {Outlet} from 'react-router-dom';

// 임시 프로필 사진 url
const imgUrl =
  'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg';

const SettingLayout = () => {
  return (
    <div className='relative flex flex-col'>
      {/* content */}
      <div className='mt-215 w-full bg-[#fff] py-78 px-36 flex flex-col gap-26'>
        <h1 className='text-[#000] text-[32px] font-bold leading-[140%] text-center'>
          닉네임
        </h1>
        <SettingTabBar />
        <div className='px-28'>
          <Outlet />
        </div>
      </div>

      {/* profile */}
      <div
        className='absolute top-215 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-full w-132 h-132 border-1 border-solid border-primary'
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};

export default SettingLayout;
