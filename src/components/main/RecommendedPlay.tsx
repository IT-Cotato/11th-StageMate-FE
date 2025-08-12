import PlayTag from '@/components/main/PlayTag';
import RecommendedPlayList from './RecommendedPlayList';
import {useRecommendedPlays} from '@/hooks/useRecommendedPlays';
import {useNavigate} from 'react-router-dom';
import LoadMoreButton from '../global/LoadMoreButton';

/**
 * 관리자가 설정한 태그에 따른 추천 공연들을 보여줍니다.
 * 첫째 줄은 뮤지컬, 둘째 줄은 연극 장르로 구성됩니다.
 * 데이터에 따라 태그 text가 변경될 수 있습니다.
 */
const categories = [
  [
    {id: 0, category: '오리지널/내한 뮤지컬'},
    {id: 1, category: '라이선스'},
  ],
  [
    {id: 5, category: '리미티드런'},
    {id: 4, category: '스테디셀러'},
  ],
] as const;

const RecommendedPlay = () => {
  const {data: recommendedPlays, isLoading, isError} = useRecommendedPlays();
  const navigate = useNavigate();

  const playList =
    recommendedPlays?.map((item, idx) => ({
      id: idx,
      title: item.performanceName,
      performance: item.performanceName,
      imageUrl: item.imageUrl,
      url: item.url,
    })) ?? [];

  const splitPlayLists = [playList.slice(0, 5), playList.slice(5, 10)];

  return (
    <div className='flex flex-col w-full bg-white rounded-[20px] pt-[30px] pl-[22px] pb-[20px] gap-20'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-gray-30 font-bold text-2xl'>오늘의 추천 공연</h1>
        <div className='flex items-center cursor-pointer mr-[27px]'>
          <LoadMoreButton onClick={() => navigate('/performance')} />
        </div>
      </div>

      {isError ? (
        <div className='flex items-center justify-center py-20 text-red-500 text-lg font-semibold h-[300px]'>
          추천 공연을 불러오지 못했습니다.
        </div>
      ) : (
        categories.map((row, index) => (
          <div key={index} className='flex flex-col sm:gap-20 '>
            <div className='flex h-50 gap-10 overflow-x-auto scrollbar-hide'>
              {row.map((tag) => (
                <PlayTag key={tag.id} text={tag.category} />
              ))}
            </div>
            <RecommendedPlayList
              plays={splitPlayLists[index] ?? []}
              isLoading={isLoading}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendedPlay;
