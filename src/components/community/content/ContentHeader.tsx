import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import Share from '@/assets/community/share.svg?react';
import {useNavigate} from 'react-router-dom';

interface ContentHeaderProps {
  showShare?: boolean;
}

const ContentHeader = ({showShare = true}: ContentHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col w-full bg-white'>
      <div className='w-full flex flex-row justify-between sm:px-30 sm:py-15 px-15 py-[7.5px]'>
        <ChevronLeft 
          onClick={() => navigate(-1)} 
          className="cursor-pointer w-[50px] h-[50px]"
        />
        {showShare && <Share className='w-[50px] h-[50px]' />}
      </div>
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />
    </div>
  );
};

export default ContentHeader;
