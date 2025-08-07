import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';

/**
 * 공통 더 보기 컴포넌트
 * 더 보기 클릭 시 navigate 되는 경로를 props로 받음 */
interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton = ({onClick}: LoadMoreButtonProps) => {
  return (
    <div className='flex flex-row items-center'>
      <button
        className='text-[14px] font-medium text-primary cursor-pointer hover:font-semibold'
        onClick={onClick}>
        더 보기
      </button>
      <ChevronRight className='text-primary w-20' />
    </div>
  );
};

export default LoadMoreButton;
