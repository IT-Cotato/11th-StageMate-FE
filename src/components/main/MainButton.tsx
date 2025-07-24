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
      className={`flex justify-center items-center ${widthClass} px-[24px] py-[13px] h-40 rounded-[14px] border-[1px] border-white bg-white/20 text-[20px] text-white font-medium cursor-pointer mb-5`}
      style={fixedWidth ? {width: `${fixedWidth}px`} : {}}>
      {text}
    </button>
  );
};

export default MainButton;
