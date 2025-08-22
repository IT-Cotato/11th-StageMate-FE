/**
 * 메인 페이지 - title, 하트 개수, 댓글을 포함하는 게시물 아이템 컴포넌트
 * 사용하는 곳에서 카테고리 별로 필터링된 게시물 목록을 props로 전달
 */

import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import Chat from '@/assets/community/community-chat.svg?react';
import type {Post} from '@/types/community';
import {useScrapStore} from '@/stores/useScrapStore';
interface PostItemProps {
  post: Post;
  onPostClick?: () => void;
  onLikeClick?: () => void;
  variant?: 'hot' | 'daily';
}

const PostItem = ({post, onPostClick, onLikeClick, variant}: PostItemProps) => {
  const {isLiked, getCounts} = useScrapStore();

  // 전역 상태에서 실시간으로 좋아요 상태와 카운트 가져오기
  const isCurrentlyLiked = isLiked(post.id, 'community');
  const currentCounts = getCounts(post.id, 'community');
  return (
    <div
      className='flex items-center gap-10 w-full bg-[#ffffff] cursor-pointer'
      onClick={onPostClick}>
      {/* title */}
      <div className='flex flex-col flex-1'>
        {variant === 'hot' ? (
          <div className='line-clamp-1 text-md'>{post.title}</div>
        ) : (
          <>
            <div className='text-md line-clamp-1'>{post.title}</div>
            <div className='text-sm text-gray-2'>{post.createdAt}</div>
            {/* [24시간 이내: 시간], [그 외: 월/일] */}
          </>
        )}
      </div>

      {/* count */}
      <div className={`flex flex-col items-end`}>
        <div className='flex justify-end items-center text-sm'>
          <div className='flex gap-14 '>
            {/* heart */}
            <div className='flex items-center gap-2 w-46'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLikeClick?.();
                }}
                className='m-[2.5px]'>
                {isCurrentlyLiked ? (
                  <FullHeart width={20} height={20} />
                ) : (
                  <EmptyHeart
                    className='stroke-secondary'
                    width={20}
                    height={20}
                  />
                )}
              </button>
              <span>
                {currentCounts.likeCount > 99 ? '99+' : currentCounts.likeCount}
              </span>
            </div>

            {/* comment */}
            <div className='flex items-center gap-2 w-46'>
              <div className=' m-[2.5px]'>
                <Chat className='text-secondary w-20' />
              </div>
              <span>
                {currentCounts.commentCount > 99
                  ? '99+'
                  : currentCounts.commentCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
