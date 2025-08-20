import ChevronLeft from '@/assets/arrows/chevron-left.svg?react';
import {useNavigate} from 'react-router-dom';

interface BackButtonTitleHeaderProps {
  title: string;
  between?: boolean;
  borderBottom?: boolean;
}

const BackButtonTitleHeader = ({
  title,
  between,
  borderBottom,
}: BackButtonTitleHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`px-20 flex justify-${between ? 'between' : 'start'} items-center ${borderBottom ? 'border-b border-solid border-primary-5' : ''}`}>
      <ChevronLeft
        className='w-58 h-51 ml-[-20px] hover:cursor-pointer'
        onClick={() => navigate(-1)}
      />
      <h1 className='text-[#000] text-xl font-bold leading-[140%] line-clamp-1'>
        {title}
      </h1>
    </div>
  );
};

export default BackButtonTitleHeader;
