/** 
 * 인터파크 기준 카테고리 명을 Props로 받는 컴포넌트
 * 
    인터파크 기준 카테고리 : 창작 뮤지컬, 오리지널/내한 뮤지컬, 라이선스 뮤지컬, 넘버별 퍼포먼스, 아동/가족 뮤지컬
    리미티드런, 스테디셀러
 */

interface PlayTagProps {
  text: string;
}
const PlayTag = ({text}: PlayTagProps) => {
  return (
    <div className='h-38 w-fit rounded-[10px] bg-primary-4 text-[20px] text-white font-normal whitespace-nowrap px-[21px] py-8 flex items-center'>
      # {text}
    </div>
  );
};

export default PlayTag;
