interface LoadMoreButtonProps {
  onClick: () => void;
  variant?: 'full' | 'fixed';
}

const LoadMoreButton = ({onClick, variant = 'full'}: LoadMoreButtonProps) => {
  const widthClass = variant === 'full' ? 'w-full' : 'w-[126px]';
  return (
    <button
      onClick={onClick}
      className={`flex ${widthClass} h-[25px] items-center justify-center bg-[#ffffff] cursor-pointer hover:font-bold active:font-bold shadow-xs`}>
      더보기
    </button>
  );
};

export default LoadMoreButton;
