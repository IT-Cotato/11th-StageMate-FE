import MainButton from './MainButton';
import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';

interface LoggedInHeaderProps {
  username?: string;
}

export default function LoggedInHeader({username}: LoggedInHeaderProps) {
  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-[28px] text-white font-bold mt-[19px] mb-[19px]'>
          {username} 님 안녕하세요!
        </h1>
        <div className='flex flex-row items-center text-white cursor-pointer'>
          아카이빙 하러 가기
          <ChevronRight className='text-white' />
        </div>
      </div>

      <div className='w-full flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-4'>
          <MainButton text='마이페이지' />
          <MainButton text='커뮤니티' />
        </div>
        {/** 목업용 임시 포스터 */}
        <div className='flex flex-row gap-10'>
          <img
            src='img/mock-poster1.png'
            alt=''
            className='w-[80px] h-[116px]'
          />
          <img
            src='img/mock-poster2.png'
            alt=''
            className='w-[80px] h-[116px]'
          />
          <img
            src='img/mock-poster3.png'
            alt=''
            className='w-[80px] h-[116px]'
          />
        </div>
      </div>
    </div>
  );
}
