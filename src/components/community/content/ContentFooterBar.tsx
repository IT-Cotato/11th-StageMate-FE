import Heart from '@/assets/community/community-content-nav-heart.svg?react';
import Chat from '@/assets/community/community-content-nav-chat.svg?react';
import BookMark from '@/assets/community/bookmark.svg?react';

const ContentFooterBar = () => {
  return (
    <div className='w-full flex justify-center bg-[#fff] sm:py-16 sm:px-90 px-45 py-8 border-t-[1px] border-primary'>
      <div className='flex w-full max-w-[413px] justify-between items-center'>
        <Heart width={40} height={40} />
        <Chat width={33} height={35} />
        <BookMark width={40} height={40} />
      </div>
    </div>
  );
};

export default ContentFooterBar;
