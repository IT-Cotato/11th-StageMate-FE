/** 
 * 인터파크 기준 카테고리 명을 Props로 받는 컴포넌트
 * 
    인터파크 기준 카테고리 : 창작 뮤지컬, 오리지널/내한 뮤지컬, 라이선스 뮤지컬, 넘버별 퍼포먼스, 아동/가족 뮤지컬
    리미티드런, 스테디셀러
 */

interface PlayTagProps {
  categories: string[];
}
export default function PlayTag({categories}: PlayTagProps) {
  return (
    <div className='flex h-50 gap-10 overflow-x-auto scrollbar-hide'>
      {categories.map((category, index) => (
        <div
          key={index}
          className='h-44 rounded-[10px] bg-primary-20 text-[20px] text-white font-normal whitespace-nowrap px-[21px] py-8 flex items-center'>
          # {category}
        </div>
      ))}
    </div>
  );
}
