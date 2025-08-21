import Heart from '@/assets/hearts/empty-heart.svg?react';
import Chat from '@/assets/community/community-chat.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import type {Post} from '@/types/community';

interface SearchCommunityItemProps {
  post: Post;
  onClick: () => void;
}
const SearchCommunityItem = ({post, onClick}: SearchCommunityItemProps) => {
  return (
    <div
      className='w-full h-[76px] items-center px-14 flex flex-row justify-between bg-[#fff] cursor-pointer'
      onClick={onClick}>
      <div>
        <span className='sm:text-[18px] text-[16px]'>{post.title}</span>
        <div className='flex flex-row gap-4 text-[12px] items-center'>
          <span>{post.createdAt} |</span>
          <span>조회수 {post.viewCount} |</span>
          <span>작성자 {post.author} </span>
        </div>
      </div>

      <div className='flex flex-row text-[16px] gap-9'>
        <div className='flex flex-row items-center gap-4'>
          {post.isLiked ? (
            <FullHeart className='sm:w-23 w-20' />
          ) : (
            <Heart className='stroke-black sm:w-23 w-20' />
          )}

          <span className='sm:text-[16px] text-[12px]'>{post.likeCount}</span>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Chat className='sm:w-23 w-20' />
          <span className='sm:text-[16px] text-[12px]'>
            {post.commentCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchCommunityItem;
