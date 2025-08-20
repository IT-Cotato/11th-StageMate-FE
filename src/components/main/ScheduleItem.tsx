import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import CategoryBadge from '../global/CategoryBadge';
import {togglePerformanceScheduleScrap} from '@/api/performanceSchedulePrivateApi';
import {useScrapStore} from '@/stores/useScrapStore';

interface ScheduleItemProps {
  id: string | number;
  title: string;
  category: string;
  showLike?: boolean;
  isLike?: boolean;
  onLikeClick?: () => void;
  onClick?: () => void;
  selected?: boolean;
  isSelectable?: boolean;
}

const ScheduleItem = ({
  id,
  title,
  category,
  showLike = true,
  onLikeClick,
  onClick,
  selected = false,
  isSelectable = true,
}: ScheduleItemProps) => {
  const {isScraped, toggleScrap} = useScrapStore();
  const currentIsScraped = isScraped(String(id));

  const handleLikeClick = async () => {
    // 즉시 전역 상태 업데이트
    toggleScrap(String(id));

    try {
      // 2초 타임아웃으로 API 호출
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API 타임아웃')), 2000)
      );

      await Promise.race([
        togglePerformanceScheduleScrap(Number(id)),
        timeoutPromise,
      ]);

      console.log('스크랩 성공');
      onLikeClick?.();
    } catch (error) {
      console.warn('스크랩 API 실패/타임아웃, UI 상태 유지:', error);
      // 타임아웃이나 에러 시에도 전역 상태는 그대로 유지
    }
  };
  const baseClasses =
    'flex justify-between px-[12.5px] py-[6.5px] bg-[#ffffff]';
  const selectableClasses = isSelectable
    ? 'cursor-pointer hover:bg-primary-3 hover:border-primary'
    : '';
  const selectedClasses = selected ? 'border-primary bg-primary-3' : '';

  return (
    <div
      onClick={isSelectable ? onClick : undefined}
      className={[baseClasses, selectableClasses, selectedClasses].join(' ')}>
      <div className='flex flex-row gap-[30px] min-w-0'>
        <div className='flex-shrink-0'>
          <CategoryBadge text={category} />
        </div>
        <div className='flex items-center leading-none font-medium text-black text-[18px] min-w-0 flex-1'>
          <span className='truncate'>{title}</span>
        </div>
      </div>

      {showLike && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick();
          }}>
          {currentIsScraped ? (
            <FullHeart />
          ) : (
            <EmptyHeart className='stroke-secondary' />
          )}
        </button>
      )}
    </div>
  );
};

export default ScheduleItem;
