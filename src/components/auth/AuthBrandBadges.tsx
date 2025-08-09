import FacebookLight from '@/assets/brands/facebook-light.svg?react';
import GoogleLight from '@/assets/brands/google-light.svg?react';
import TwitterLight from '@/assets/brands/twitter-light.svg?react';
import AppleLight from '@/assets/brands/apple-light.svg?react';

const AuthBrandBadges = () => {
  return (
    <div className='flex items-center gap-20'>
      <div
        onClick={() => console.log('facebook 버튼 클릭')}
        className='flex w-50 h-50 p-10 items-center justify-center gap-10 rounded-[25px] bg-gray-1'>
        <FacebookLight />
      </div>
      <div
        onClick={() => console.log('google 버튼 클릭')}
        className='flex w-50 h-50 p-10 items-center justify-center gap-10 rounded-[25px] bg-gray-1'>
        <GoogleLight />
      </div>
      <div
        onClick={() => console.log('twitter 버튼 클릭')}
        className='flex w-50 h-50 p-10 items-center justify-center gap-10 rounded-[25px] bg-gray-1'>
        <TwitterLight />
      </div>
      <div
        onClick={() => console.log('apple 버튼 클릭')}
        className='flex w-50 h-50 p-10 items-center justify-center gap-10 rounded-[25px] bg-gray-1'>
        <AppleLight />
      </div>
    </div>
  );
};

export default AuthBrandBadges;
