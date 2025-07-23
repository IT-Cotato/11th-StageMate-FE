// 게시글 목록 아이템 컴포넌트
import type {Post} from '@/types/community';
import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import Chat from '@/assets/community/community-chat.svg?react';
import PostHeaderInfo from './PostHeaderInfo';

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({post}: PostListItemProps) => {
  return (
    <article className='flex flex-col justify-center pb-8 border-b border-b-primary-5'>
      <div className='flex justify-between items-center px-16'>
        {/* 왼쪽: 제목 + 작성자 + 날짜 + 조회수 */}
        <PostHeaderInfo
          title={post.title}
          nickname={post.nickname}
          date={post.date}
          viewCount={post.viewCount}
          variant='list'
        />

        {/* 오른쪽: 좋아요 + 댓글 */}
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
