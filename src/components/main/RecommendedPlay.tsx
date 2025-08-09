import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';
import PlayTag from './PlayTag';
import RecommendedPlayList from './RecommendedPlayList';
import {mockRecommendedPlays} from '@/mocks/mockRecommendedPlays';
import {useNavigate} from 'react-router-dom';

const categories = [
  [
    {id: 0, category: '창작 뮤지컬'},
    {id: 1, category: '오리지널/내한 뮤지컬'},
  ],
  [
    {id: 5, category: '리미티드 런'},
    {id: 4, category: '아동/가족 뮤지컬'},
  ],
] as const;

const RecommendedPlay = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col w-full bg-white rounded-[20px] pt-[30px] pl-[22px] pb-[20px] gap-20'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-gray-30 font-bold text-2xl'>오늘의 추천 공연</h1>
        <div className='flex items-center cursor-pointer mr-[27px]'>
          <h2
            className='text-[16px] font-medium text-primary'
            onClick={() => navigate('/performance')}>
            더 보기
          </h2>
          <ChevronRight className='text-primary' />
        </div>
      </div>

      {categories.map((row, index) => (
        <div key={index} className='flex flex-col gap-19'>
          <div className='flex h-50 gap-10 overflow-x-auto scrollbar-hide'>
            {row.map((tag) => (
              <PlayTag key={tag.id} text={tag.category} />
            ))}
          </div>
          <RecommendedPlayList
            plays={[
              ...mockRecommendedPlays[row[0].category],
              ...mockRecommendedPlays[row[1].category],
            ]}
          />
        </div>
      ))}
    </div>
  );
};

export default RecommendedPlay;
