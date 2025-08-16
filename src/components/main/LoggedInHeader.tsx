import {useNavigate} from 'react-router-dom';
import MainButton from './MainButton';
import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';

interface LoggedInHeaderProps {
  username?: string;
}

const LoggedInHeader = ({username}: LoggedInHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-[11px]'>
        <h1 className='sm:text-[20px] text-[18px] text-white font-bold'>
          {username} 님 안녕하세요!
        </h1>
        <button
          className='flex flex-row items-center text-white text-[16px] cursor-pointer'
          onClick={() => navigate('/archive')}>
          아카이빙 하러 가기
          <ChevronRight className='text-white' />
        </button>
      </div>

      <div className='w-full flex flex-row gap-10 items-center justify-between'>
        <div className='flex flex-col flex-1'>
          <MainButton
            text='마이페이지'
            onClick={() => navigate('/settings')}
            fullWidth
          />
          <MainButton
            text='커뮤니티'
            onClick={() => navigate('/community')}
            fullWidth
          />
        </div>
        {/** 목업용 임시 포스터 */}
        <div className='flex flex-row gap-10'>
          <img
            src='img/mock-poster1.png'
            alt=''
            className='sm:w-[80px] sm:h-[116px] w-50 h-80'
          />
          <img
            src='img/mock-poster2.png'
            alt=''
            className='sm:w-[80px] sm:h-[116px] w-50 h-80'
          />
          <img
            src='img/mock-poster3.png'
            alt=''
            className='sm:w-[80px] sm:h-[116px] w-50 h-80'
          />
        </div>
      </div>
    </div>
  );
};

export default LoggedInHeader;
