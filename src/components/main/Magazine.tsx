import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';
import PlayTag from './PlayTag';
import RecommendedPlay from './RecommendedPlay';
import {mockRecommendedPlays} from '@/mocks/mockRecommendedPlays';

export default function Magazine() {
  const categories = [
    ['창작 뮤지컬', '오리지널/내한 뮤지컬'],
    ['리미티드 런', '아동/가족 뮤지컬'],
  ];
  return (
    <div className='flex flex-col w-full bg-white rounded-[20px] pt-[30px] pl-[22px] pb-[20px] gap-20'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-gray-30 font-bold text-2xl'>오늘의 추천 공연</h1>
        <div className='flex items-center cursor-pointer mr-[27px]'>
          <h2 className='text-[16px] font-medium text-primary'>자세히 보기</h2>
          <ChevronRight className='text-primary' />
        </div>
      </div>

      {categories.map((row, index) => (
        <div key={index} className='flex flex-col gap-19'>
          <PlayTag categories={row} />
          <RecommendedPlay
            plays={[
              ...mockRecommendedPlays[row[0]],
              ...mockRecommendedPlays[row[1]],
            ]}
          />
        </div>
      ))}
    </div>
  );
}
