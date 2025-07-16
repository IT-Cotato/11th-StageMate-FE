/**
 * 메인 페이지 주간 캘린더 영역에 사용하는 버튼 컴포넌트
 * - 기본(default) / 외곽선(outline) 스타일을 variant로 구분
 */

interface CalendarButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'default' | 'outline';
}

const CalendarButton = ({
  text,
  onClick,
  variant = 'default',
}: CalendarButtonProps) => {
  const baseClass =
    'flex justify-center items-center w-full py-[5.5px] text-[15px] font-bold cursor-pointer rounded-[10px]';

  const variantClass =
    variant === 'outline'
      ? 'bg-[#ffffff] text-primary-2'
      : 'bg-primary-2 text-white';

  return (
    <button className={`${baseClass} ${variantClass}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default CalendarButton;
