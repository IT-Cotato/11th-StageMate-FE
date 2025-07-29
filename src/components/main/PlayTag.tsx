/** 
 * 인터파크 기준 카테고리 명을 Props로 받는 컴포넌트
 * 
    인터파크 기준 카테고리 : 창작 뮤지컬, 오리지널/내한 뮤지컬, 라이선스 뮤지컬, 넘버별 퍼포먼스, 아동/가족 뮤지컬
    리미티드런, 스테디셀러
 */

interface PlayTagProps {
  text: string;
  selected?: boolean;
  onClick?: (text: string) => void;
  variant?: 'default' | 'search';
}
const PlayTag = ({
  text,
  selected,
  onClick,
  variant = 'default',
}: PlayTagProps) => {
  const baseStyle =
    'sm:h-38 h-30 w-fit rounded-[10px] sm:text-[20px] text-[16px] font-normal sm:px-[21px] px-10 py-8 flex items-center cursor-pointer';

  const styleByVariant =
    variant === 'search'
      ? `border border-primary-2 text-primary-2 ${selected ? 'bg-primary-1' : 'bg-[#fff]'}`
      : `${selected ? 'bg-primary-3 text-white' : 'bg-primary-4 text-white'}`;

  return (
    <div
      onClick={() => onClick?.(text)}
      className={`${baseStyle} ${styleByVariant}`}>
      # {text}
    </div>
  );
};

export default PlayTag;
