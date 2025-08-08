import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import HomeOutline from '@/assets/bottomNavigationBar/home-outline.svg?react';
import {useNavigate} from 'react-router-dom';

export interface PageHeaderProps {
  title?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  showHomeIcon?: boolean;
  showBottomLine?: boolean;
  className?: string;
}

const PageHeader = ({
  title,
  onLeftClick,
  onRightClick,
  showHomeIcon = true,
  showBottomLine = true,
  className = '',
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const handleLeftClick = () => {
    if (onLeftClick) {
      onLeftClick();
    } else {
      navigate(-1);
    }
  };
  return (
    <div
      className={`flex flex-col pr-10 pl-6 justify-end items-center shrink-0 bg-white gap-20 z-50 ${className}`}>
      <div className='flex w-full justify-between items-center h-40'>
        <ChevronLeft
          onClick={handleLeftClick}
          className='w-40 h-40 aspect-square cursor-pointer'
        />
        <p className='text-[#141313] text-2xl leading-[140%]'>{title}</p>
        {showHomeIcon ? (
          <div className='flex justify-center items-center w-40 h-40'>
            <HomeOutline
              onClick={onRightClick}
              className='w-[22.289px] h-[20.802px]'
            />
          </div>
        ) : (
          <div className='w-40 h-40' />
        )}
      </div>

      {showBottomLine && (
        <div
          className='w-full h-3 shrink-0 
    bg-[linear-gradient(90deg,var(--color-white)_0%,var(--color-primary-2)_31.73%,var(--color-primary-2)_75.48%,var(--color-white)_100%)]'
        />
      )}
    </div>
  );
};

export default PageHeader;
