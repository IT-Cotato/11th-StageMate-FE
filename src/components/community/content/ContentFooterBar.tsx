import Heart from '@/assets/community/community-content-nav-heart.svg?react';
import Chat from '@/assets/community/community-content-nav-chat.svg?react';
import BookMark from '@/assets/community/bookmark.svg?react';
import type {Post} from '@/types/community';

interface ContentFooterBarProps {
  post?: Pick<Post, 'isLiked' | 'commentCount' | 'bookmarkCount'>;
}

const ContentFooterBar = ({post}: ContentFooterBarProps) => {
  return (
    <div className='w-full flex justify-center bg-[#fff] sm:py-16 sm:px-90 px-45 py-8 border-t-[1px] border-primary'>
      <div className='flex w-full max-w-[413px] justify-between items-center'>
        <div className='flex flex-col items-center gap-2'>
          <Heart width={40} height={40} />
          <span>{post?.isLiked}</span>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <Chat width={33} height={35} />
          <span>{post?.commentCount}</span>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <BookMark width={40} height={40} />
          <span>{post?.bookmarkCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentFooterBar;
