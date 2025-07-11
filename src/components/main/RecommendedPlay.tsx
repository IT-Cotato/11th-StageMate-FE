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
}

interface RecommendedPlayProps {
  plays: Play[];
}

export default function RecommendedPlay({plays}: RecommendedPlayProps) {
  const listWrapperRef = useHorizontalScroll();
  return (
    <ul className='flex gap-18 overflow-x-auto ' ref={listWrapperRef}>
      {plays.map((play) => (
        <RecommendedPlayItem key={play.id} title={play.title} />
      ))}
    </ul>
  );
}
