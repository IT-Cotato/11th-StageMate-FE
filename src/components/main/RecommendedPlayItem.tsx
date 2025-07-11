import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';

interface RecommendedPlayItemProps {
  title: string;
}

export default function RecommendedPlayItem({title}: RecommendedPlayItemProps) {
  return (
    <li className='flex flex-col min-w-[200px] gap-10 shrink-0'>
      <div className='w-full min-h-[227px] bg-gray-10 rounded-[20px]'>
        {/** 이미지 자리 */}
        추천극 임시
      </div>
      <div className='w-full flex items-center justify-between'>
        <h2 className='w-[96px] text-gray-30 font-bold text-[16px]  whitespace-nowrap '>
          {title}
        </h2>
        <div className='flex flex-row cursor-pointer '>
          <h2 className='font-medium text-[16px] text-primary-50'>보러가기</h2>
          <ChevronRight className='text-primary-50' />
        </div>
      </div>
    </li>
  );
}
