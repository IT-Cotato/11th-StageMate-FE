// 게시글 목록 아이템 컴포넌트
import type {Post} from '@/types/community';
import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import Chat from '@/assets/community/community-chat.svg?react';
import PostHeaderInfo from './PostHeaderInfo';
import formatKoreanTime from '@/util/formatKoreanTime';

interface PostListItemProps {
  post: Post;
  onClick?: () => void;
  onLikeClick?: () => void;
}

const PostListItem = ({post, onClick, onLikeClick}: PostListItemProps) => {
  return (
    <article className='flex flex-col justify-center pb-8 border-b border-b-primary-5'>
      <div
        className='flex justify-between items-center px-16 cursor-pointer'
        onClick={onClick}>
        {/* 왼쪽: 제목 + 작성자 + 날짜 + 조회수 */}
        <PostHeaderInfo
          title={post.title}
          nickname={post.nickname}
          date={formatKoreanTime(post.date)}
          viewCount={post.viewCount}
          variant='list'
        />

        {/* 오른쪽: 좋아요 + 댓글 */}
        <div className='flex items-center justify-center gap-16 text-sm text-gray-500'>
          <span className='flex flex-col items-center gap-[3px]'>
            <button 
              className='w-20 h-20 flex items-center justify-center'
              onClick={(e) => {
                e.stopPropagation();
                onLikeClick?.();
              }}>
              {post.isLiked ? (
                <FullHeart className='w-full h-full' />
              ) : (
                <EmptyHeart className='w-full h-full stroke-secondary' />
              )}
            </button>
            <span className='text-black font-normal text-[12px] leading-[140%]'>
              {post.likeCount}
            </span>
          </span>
          <span className='flex flex-col items-center gap-[3px]'>
            <span className='w-20 h-20 flex items-center justify-center'>
              <Chat className='w-full h-full text-secondary mb-[2px]' />
            </span>
            <span className='text-black font-normal text-[12px] leading-[140%]'>
              {post.commentCount}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostListItem;
