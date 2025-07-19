interface LoadMoreButtonProps {
  variant?: 'full' | 'fixed';
}

const LoadMoreButton = ({variant = 'full'}: LoadMoreButtonProps) => {
  const widthClass = variant === 'full' ? 'w-full' : 'w-[126px]';
  return (
    <button
      className={`flex ${widthClass} h-[25px] items-center justify-center bg-[#ffffff] cursor-pointer hover:bg-primary-2 hover:text-white active:bg-primary-2 active:text-white`}>
      더보기
    </button>
  );
};

export default LoadMoreButton;
