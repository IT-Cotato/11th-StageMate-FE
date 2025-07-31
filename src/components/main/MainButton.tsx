/**
 * props로 텍스트를 받는 버튼 컴포넌트 - 메인 페이지 부분
 */

interface MainButtonProps {
  text: string;
  onClick: () => void;
  fullWidth?: boolean;
  fixedWidth?: number;
}
const MainButton = ({
  text,
  onClick,
  fullWidth,
  fixedWidth,
}: MainButtonProps) => {
  const widthClass = fullWidth
    ? 'w-full'
    : fixedWidth
      ? ''
      : 'w-full md:w-[288px]';
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center ${widthClass} sm:h-40 rounded-[14px] sm:border-[1px] border-[0.5px] border-white bg-white/20 sm:text-[20px] text-white font-medium cursor-pointer mb-5 hover:bg-white/10 active:bg-white/10`}
      style={fixedWidth ? {width: `${fixedWidth}px`} : {}}>
      {text}
    </button>
  );
};

export default MainButton;
