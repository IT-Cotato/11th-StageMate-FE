import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import Share from '@/assets/community/share.svg?react';
const ContentHeader = () => {
  return (
    <div className='flex flex-col w-full '>
      <div className='w-full flex flex-row justify-between px-30 py-15'>
        <ChevronLeft />
        <Share />
      </div>
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />
    </div>
  );
};

export default ContentHeader;
