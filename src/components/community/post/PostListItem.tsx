import type {Post} from '@/types/community';
import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import Chat from '@/assets/community/community-chat.svg?react';

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({post}: PostListItemProps) => {
  return (
    <article className='flex flex-col justify-center pb-8 border-b border-b-primary-5'>
      <div className='flex justify-between items-center px-16'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-2xl not-italic font-medium leading-[110%]'>
            {post.title}
          </h2>
          <div className='flex items-start gap-10'>
            <span className='text-gray-2 text-[15px] font-light leading-[140%]'>
              {post.nickname}
            </span>
            <time className='text-gray-2 text-[15px] font-light leading-[140%]'>
              {post.date}
            </time>
            <span className='text-gray-2 text-[15px] font-light leading-[140%]'>
              {post.viewCount}
            </span>
          </div>
        </div>

        <div className='flex items-center justify-center gap-4 text-sm text-gray-500'>
          <span className='flex flex-col items-center gap-[3px]'>
            {post.isLiked ? (
              <FullHeart className='w-[30px] h-[30px] text-secondary-50' />
            ) : (
              <EmptyHeart className='w-[30px] h-[30px] text-secondary-50' />
            )}
            <span className='text-black font-normal leading-[140%]'>
              {post.likeCount}
            </span>
          </span>
          <span className='flex flex-col items-center gap-[3px]'>
            <Chat className='w-[30px] h-[30px] text-secondary-50' />
            <span className='text-black font-normal leading-[140%]'>
              {post.commentCount}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostListItem;
