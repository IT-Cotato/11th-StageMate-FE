import Heart from '@/assets/community/community-content-nav-heart.svg?react';
import Chat from '@/assets/community/community-content-nav-chat.svg?react';
import BookMark from '@/assets/community/bookmark.svg?react';
import type {Post} from '@/types/community';

interface ContentFooterBarProps {
  post?: Pick<Post, 'isLiked' | 'commentCount' | 'isScrapped'>;
  onLikeClick?: () => void;
  onScrapClick?: () => void;
  likeCount?: number;
  scrapCount?: number;
}

const ContentFooterBar = ({
  post,
  onLikeClick,
  onScrapClick,
  likeCount,
  scrapCount,
}: ContentFooterBarProps) => {
  return (
    <div className='w-full flex justify-center bg-[#fff] sm:py-16 sm:px-90 px-45 py-8 border-t-[1px] border-primary'>
      <div className='flex w-full max-w-[413px] justify-between items-center'>
        <button
          onClick={onLikeClick}
          className='flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity'>
          <Heart
            width={40}
            height={40}
            className='fill-black text-black'
          />
          <span className='text-sm'>{likeCount ?? 0}</span>
        </button>

        <div className='flex flex-col items-center gap-2'>
          <Chat width={33} height={35} />
          <span className='text-sm'>{post?.commentCount ?? 0}</span>
        </div>

        <button
          onClick={onScrapClick}
          className='flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity'>
          <BookMark
            width={40}
            height={40}
            className='fill-black text-black'
          />
          <span className='text-sm'>{scrapCount ?? 0}</span>
        </button>
      </div>
    </div>
  );
};

export default ContentFooterBar;
