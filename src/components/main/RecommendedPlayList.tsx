/**
 * 추천 극을 보여주는 컴포넌트
 * 공연 상세 내용을 연결합니다.
 */

import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import RecommendedPlayItem from './RecommendedPlayItem';

interface Play {
  id: number;
  title: string;
  imageUrl?: string;
  url?: string;
}

interface RecommendedPlayProps {
  plays: Play[];
  isLoading?: boolean;
}

const RecommendedPlayList = ({plays, isLoading}: RecommendedPlayProps) => {
  const listWrapperRef = useHorizontalScroll();

  if (isLoading) {
    return (
      <ul
        className='flex overflow-x-auto w-full gap-x-10 sm:gap-x-18'
        ref={listWrapperRef}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div className='flex flex-col sm:gap-10 w-fit items-center' key={i}>
              <li
                key={i}
                className='skeleton-shimmer rounded-[20px] sm:min-w-[190px] min-w-[130px] h-[230px]'
              />
              <div className='skeleton-shimmer w-[140px] h-25 rounded-[20px]'></div>
            </div>
          ))}
      </ul>
    );
  }

  return (
    <ul
      className='flex overflow-x-auto w-full gap-x-10 sm:gap-x-18'
      ref={listWrapperRef}>
      {plays.map((play) => (
        <RecommendedPlayItem
          key={play.id}
          title={play.title}
          imageUrl={play.imageUrl}
          url={play.url}
        />
      ))}
    </ul>
  );
};

export default RecommendedPlayList;
