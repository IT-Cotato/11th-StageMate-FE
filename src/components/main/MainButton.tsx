/**
 * props로 텍스트를 받는 버튼 컴포넌트 - 메인 페이지 부분
 */

interface MainButtonProps {
  text: string;
  fullWidth?: boolean;
  fixedWidth?: number;
}
export default function MainButton({
  text,
  fullWidth,
  fixedWidth,
}: MainButtonProps) {
  const widthClass = fullWidth ? 'w-full' : fixedWidth ? '' : 'w-[265px]';
  return (
    <button
      className={`flex justify-center items-center ${widthClass} px-[24px] py-[13px] h-60 rounded-[14px] border-[1px] border-white bg-white text-2xl text-secondary-50 font-bold cursor-pointer mb-5`}
      style={fixedWidth ? {width: `${fixedWidth}px`} : {}}>
      {text}
    </button>
  );
}
