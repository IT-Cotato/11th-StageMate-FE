/**
 * 메인 페이지 - title, 하트 개수, 댓글을 포함하는 게시물 아이템 컴포넌트
 * 사용하는 곳에서 카테고리 별로 필터링된 게시물 목록을 props로 전달
 */

import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import Chat from '@/assets/community/community-chat.svg?react';
import type {Post} from '@/types/community';
interface PostItemProps {
  post: Post;
  onPostClick?: () => void;
  onLikeClick?: () => void;
  variant?: 'hot' | 'daily';
}

const PostItem = ({post, onPostClick, onLikeClick, variant}: PostItemProps) => {
  return (
    <div
      className='w-full h-55 flex flex-row bg-[#ffffff] px-9 py-6 gap-10 cursor-pointer'
      onClick={onPostClick}>
      <div className='flex-1 flex flex-col justify-center'>
        {variant === 'hot' ? (
          <div className='truncate text-md sm:max-w-250 max-w-100'>
            {post.title}
          </div>
        ) : (
          <div className='text-md truncate sm:max-w-400 max-w-200'>
            {post.title}
          </div>
        )}
        {/**
         * variant가 핫이 아닐 때만 날짜 렌더링
         * 날짜 로직 수정 todo
         * 24시간 이내일 경우 -> 시간 렌더링
         * 그 외 -> 월/일 렌더링
         */}
        {variant !== 'hot' && (
          <div className='text-sm text-gray-2'>{post.date}</div>
        )}
      </div>

      <div
        className={`flex flex-col ${variant === 'hot' ? 'justify-center' : 'justify-end'} items-end h-full`}>
        <div className='flex flex-row gap-3 items-center text-sm'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLikeClick?.();
            }}>
            {post.isLiked ? (
              <FullHeart width={20} height={20} />
            ) : (
              <EmptyHeart className='stroke-secondary' width={20} height={20} />
            )}
          </button>
          <span>{post.likeCount}</span>
          <Chat className='text-secondary ml-14 w-20 mb-[1px]' />
          <span>{post.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
