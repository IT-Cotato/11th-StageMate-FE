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
}

const PostItem = ({post}: PostItemProps) => {
  return (
    <div className='w-full h-48 flex flex-row items-center bg-[#ffffff] px-9 py-6 gap-10'>
      <div className='flex-1'>{post.title}</div>
      <div className='flex flex-row items-end'>
        <button className='cursor-pointer'>
          {post.isLiked ? (
            <FullHeart width={25} height={25} />
          ) : (
            <EmptyHeart width={25} height={25} />
          )}
        </button>
        <span>{post.likeCount}</span>
        <Chat className='text-secondary-50 ml-14' />
        <span>{post.commentCount}</span>
      </div>
    </div>
  );
};

export default PostItem;
