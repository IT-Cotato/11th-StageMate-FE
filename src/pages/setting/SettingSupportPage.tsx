import ChevronRight from '@/assets/arrows/chevron-right.svg?react';
import {useNavigate} from 'react-router-dom';

const SettingSupportPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-29'>
      {/* info */}
      <div className='mx-28 py-37 px-33 flex flex-col bg-[#d9d9d9]'>
        <div
          className='flex justify-between items-center hover:cursor-pointer'
          onClick={() => navigate('/settings/announcement')}>
          <p className='text-xl font-semibold leading-[140%]'>공지사항</p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div className='flex justify-between items-center hover:cursor-pointer'>
          <p className='text-xl font-semibold leading-[140%]'>문의하기</p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div className='flex justify-between items-center hover:cursor-pointer'>
          <p className='text-xl font-semibold leading-[140%]'>
            개인정보 처리 방침
          </p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div className='flex justify-between items-center hover:cursor-pointer'>
          <p className='text-xl font-semibold leading-[140%]'>이용약관</p>
          <ChevronRight className='w-30 h-30' />
        </div>
      </div>

      {/* logout & secession */}
      <div className='flex justify-end gap-20'>
        <button className='py-4 px-10 min-w-80 border border-solid border-primary bg-white_1 text-[15px] leading-[140%] text-primary'>
          로그아웃
        </button>
        <button className='py-4 px-10 min-w-80 border border-solid border-primary bg-white_1 text-[15px] leading-[140%] text-primary'>
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default SettingSupportPage;
