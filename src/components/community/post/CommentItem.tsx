/**
 * 댓글 혹은 대댓글 하나를 렌더링하는 컴포넌트
 * - depth 값에 따라 댓글/대댓글 여부를 판단하여 UI 스타일 조정
 * - 대댓글이 존재할 경우 재귀적으로 CommentItem을 호출해 렌더링
 */
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import ArrowReply from '@/assets/community/arrow-reply.svg?react';
import type {Comment, Reply} from '@/types/community';

interface CommentItemProps {
  comment: Comment | Reply;
  depth?: number; // 0이면 댓글, 1 이상이면 대댓글
}

const CommentItem = ({comment, depth = 0}: CommentItemProps) => {
  const isReply = depth > 0;

  return (
    <>
      <div
        className={`flex justify-between items-center py-10 border-t border-primary-5 ${
          isReply ? 'pl-[22px] pr-8' : 'px-8'
        }`}>
        <div className='flex items-center gap-6'>
          {isReply && (
            // 대댓글인 경우 화살표 아이콘 표시
            <ArrowReply className='w-[24px] h-[24px] mr-[7px]' />
          )}
          <img
            src={comment.profileImgUrl}
            alt={`${comment.nickname}의 프로필`}
            className='w-[37px] h-[37px] rounded-full stroke-1 stroke-primary'
          />
          <div className='flex flex-col'>
            <strong className='font-light text-xs leading-[140%] text-black'>
              {comment.nickname}
            </strong>
            <p className='font-normal text-[15px] leading-[110%] text-black'>
              {comment.content}
            </p>
            <span className='font-light text-[10px] leading-[140%] text-gray-2'>
              {comment.createdAt}
            </span>
          </div>
        </div>
        <EllipsisVertical className='w-[24px] h-[24px]' />
      </div>

      {'replies' in comment &&
        comment.replies?.map((reply) => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
    </>
  );
};

export default CommentItem;
