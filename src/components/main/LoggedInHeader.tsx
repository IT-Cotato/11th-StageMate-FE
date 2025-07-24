import MainButton from './MainButton';
import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';

interface LoggedInHeaderProps {
  username?: string;
}

const LoggedInHeader = ({username}: LoggedInHeaderProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-[11px]'>
        <h1 className='text-[20px] text-white font-bold'>
          {username} 님 안녕하세요!
        </h1>
        <div className='flex flex-row items-center text-white text-[16px] cursor-pointer'>
          아카이빙 하러 가기
          <ChevronRight className='text-white' />
        </div>
      </div>

      <div className='w-full flex flex-row justify-between items-start'>
        <div className='flex flex-col'>
          {/* todo : fix -> MainButton의 onClick 작성  */}
          <MainButton
            text='마이페이지'
            onClick={() => console.log('todo : fix')}
          />
          <MainButton
            text='커뮤니티'
            onClick={() => console.log('todo : fix')}
          />
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
};

export default LoggedInHeader;
