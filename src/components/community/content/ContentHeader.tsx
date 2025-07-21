import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import Share from '@/assets/community/share.svg?react';
import {useNavigate} from 'react-router-dom';

const ContentHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col w-full '>
      <div className='w-full flex flex-row justify-between sm:px-30 sm:py-15 px-15 py-[7.5px]'>
        <ChevronLeft onClick={() => navigate(-1)} />
        <Share />
      </div>
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />
    </div>
  );
};

export default ContentHeader;
