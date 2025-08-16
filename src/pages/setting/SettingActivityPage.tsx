import ChevronRight from '@/assets/arrows/chevron-right.svg?react';

const SettingActivityPage = () => {
  return (
    <div className='flex flex-col gap-29'>
      {/* info */}
      <div className='mx-28 py-37 px-33 flex flex-col bg-[#d9d9d9] rounded-[10px]'>
        <div className='flex justify-between items-center hover:cursor-pointer'>
          <p className='text-xl font-semibold leading-[140%]'>
            내가 작성한 글 모아보기
          </p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div className='flex justify-between items-center hover:cursor-pointer'>
          <p className='text-xl font-semibold leading-[140%]'>
            댓글 단 글 모아보기
          </p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div className='flex justify-between items-center hover:cursor-pointer'>
          <p className='text-xl font-semibold leading-[140%]'>
            스크랩한 글 모아보기
          </p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div className='flex justify-between items-center hover:cursor-pointer'>
          <p className='text-xl font-semibold leading-[140%]'>
            스크랩한 매거진 모아보기
          </p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div className='flex justify-between items-center hover:cursor-pointer'>
          <p className='text-xl font-semibold leading-[140%]'>
            차단한 사용자 확인
          </p>
          <ChevronRight className='w-30 h-30' />
        </div>
      </div>
    </div>
  );
};

export default SettingActivityPage;
