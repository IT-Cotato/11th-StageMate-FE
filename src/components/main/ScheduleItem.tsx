import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import CategoryBadge from '../global/CategoryBadge';

interface ScheduleItemProps {
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
  title,
  category,
  showLike = true,
  isLike,
  onLikeClick,
  onClick,
  selected = false,
  isSelectable = true,
}: ScheduleItemProps) => {
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
        <CategoryBadge text={category} />
        <div className='flex items-center leading-none font-medium text-black text-[20px]'>
          {title}
        </div>
      </div>

      {showLike && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLikeClick?.();
          }}>
          {isLike ? <FullHeart /> : <EmptyHeart className='stroke-secondary' />}
        </button>
      )}
    </div>
  );
};

export default ScheduleItem;
