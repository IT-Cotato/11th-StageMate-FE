/**
 * 스케줄 리스트의 단일 항목을 렌더링하는 컴포넌트
 * - 카테고리, 제목, 좋아요 버튼 포함
 */
import EmptyHeart from '@/assets/hearts/empty-heart.svg';
import FullHeart from '@/assets/hearts/full-heart.svg';

interface ScheduleItemProps {
  title: string;
  category: string;
  isLike?: boolean;
  onLikeClick?: () => void;
}

const ScheduleItem = ({
  title,
  category,
  isLike,
  onLikeClick,
}: ScheduleItemProps) => {
  return (
    <div className='flex justify-between px-[12.5px] py-[6.5px] bg-[#FFFFFF]'>
      {/* 왼쪽: 카테고리 + 제목 */}
      <div className='flex flex-row gap-[30px]'>
        <div className='w-[62px] h-[40px] flex items-center justify-center text-[15px] font-bold text-white bg-primary rounded-full'>
          {category}
        </div>
        <div className='flex items-center leading-none font-medium text-black text-[20px]'>
          {title}
        </div>
      </div>
      {/* 오른쪽: 하트 */}
      <button onClick={onLikeClick}>
        <img src={isLike ? FullHeart : EmptyHeart} alt='heart' />
      </button>
    </div>
  );
};

export default ScheduleItem;
