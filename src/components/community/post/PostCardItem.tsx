/**
 * 메인 페이지 - 카드 형식의 아이템을 렌더링하는 컴포넌트
 * 나눔 거래, 매거진 리스트
 */

import CategoryBadge from '@/components/global/CategoryBadge';
import BookMark from '@/assets/community/bookmark.svg?react';

interface PostCardItemProps {
  title: string;
  subtitle?: string;
  price?: number | string;
  category: string;
  isBookmarked: boolean;
  isScrapMagazine?: boolean;
  placeholderText: string;
  onClick?: () => void;
}

const PostCardItem = ({
  title,
  subtitle,
  price,
  category,
  isBookmarked,
  isScrapMagazine = false,
  placeholderText,
  onClick,
}: PostCardItemProps) => {
  return (
    <li className='flex flex-col cursor-pointer' onClick={onClick}>
      <div
        className={`relative 
        ${isScrapMagazine ? 'sm:w-[160px]' : 'sm:w-[204px]'} sm:h-[209px] w-150 h-150 bg-gray-1 rounded-[7px]`}>
        <BookMark
          className={`absolute top-9 right-9 ${isBookmarked ? 'text-secondary' : ''}`}
        />
        <div className='w-full h-full flex items-center justify-center text-sm text-gray-500'>
          {placeholderText}
        </div>
        <div className='absolute bottom-7 left-7'>
          <CategoryBadge text={category} />
        </div>
      </div>

      <div className='w-full h-[56px] flex flex-col'>
        {price !== undefined ? (
          <div className='text-[16px] font-semibold'>
            {price === 0
              ? '무료 나눔'
              : typeof price === 'string'
                ? price
                : `${price.toLocaleString()}원`}
          </div>
        ) : (
          subtitle && (
            <h2 className='font-semibold sm:text-[16px] text-xs'>{subtitle}</h2>
          )
        )}

        <h1 className='sm:w-[204px] w-100 font-normal sm:text-[20px] text-sm truncate'>
          {title}
        </h1>
      </div>
    </li>
  );
};

export default PostCardItem;
