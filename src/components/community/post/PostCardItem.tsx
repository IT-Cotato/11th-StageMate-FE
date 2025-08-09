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
  placeholderText: string;
  onClick?: () => void;
  variant?: 'regular' | 'compact';
  className?: string;
}

const variantVars = {
  regular:
    '[--card-w:150px] [--card-h:150px] sm:[--card-w:204px] sm:[--card-h:209px]',
  compact:
    '[--card-w:120px] [--card-h:120px] sm:[--card-w:160px] sm:[--card-h:210px]',
} as const;

const PostCardItem = ({
  title,
  subtitle,
  price,
  category,
  isBookmarked,
  placeholderText,
  onClick,
  variant = 'regular',
  className,
}: PostCardItemProps) => {
  const vars = variantVars[variant];

  return (
    <li
      className={`flex flex-col shrink-0 cursor-pointer ${vars} ${className ?? ''}`}
      onClick={onClick}>
      {/* 사진(썸네일) 박스: 크기만 변수로 제어 */}
      <div className='relative bg-gray-1 rounded-[7px] w-[var(--card-w)] h-[var(--card-h)]'>
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
          <div className='text-[18px] font-semibold'>
            {price === 0
              ? '무료 나눔'
              : typeof price === 'string'
                ? price
                : `${price.toLocaleString()}원`}
          </div>
        ) : (
          subtitle && (
            <h2 className='font-semibold sm:text-[18px] text-xs'>{subtitle}</h2>
          )
        )}
        <h1 className='font-normal sm:text-[22px] text-sm truncate w-[var(--card-w)]'>
          {title}
        </h1>
      </div>
    </li>
  );
};

export default PostCardItem;
