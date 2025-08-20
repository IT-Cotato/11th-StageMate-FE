/**
 * 댓글 혹은 대댓글 하나를 렌더링하는 컴포넌트
 * - depth 값에 따라 댓글/대댓글 여부를 판단하여 UI 스타일 조정
 * - 대댓글이 존재할 경우 재귀적으로 CommentItem을 호출해 렌더링
 */
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import ArrowReply from '@/assets/community/modal-icons/arrow-reply.svg?react';
import type {CommunityComment} from '@/types/communityDetail';
import PostOptionModal from '@/components/modal/PostOptionModal';
import ConfirmModal from '@/components/modal/ConfirmModal';
import {useState} from 'react';
import {deleteCommunityComment} from '@/api/communityApi';

interface CommentItemProps {
  comment: CommunityComment;
  depth?: number; // 0이면 댓글, 1 이상이면 대댓글
  onCommentChange?: () => void;
  onReplyClick?: (commentId: number, authorName: string) => void;
  isSelected?: boolean;
}

const CommentItem = ({
  comment,
  depth = 0,
  onCommentChange,
  onReplyClick,
  isSelected = false,
}: CommentItemProps) => {
  const isReply = depth > 0;
  const [showOptions, setShowOptions] = useState(false);
  const [confirmType, setConfirmType] = useState<
    null | 'edit' | 'delete' | 'report' | 'block'
  >(null);

  return (
    <>
      <div
        className={`flex justify-between items-center py-10 border-t border-primary-5 ${
          isReply ? 'pl-[22px] pr-8' : 'px-8'
        } ${isSelected ? 'bg-primary-4/50' : ''} relative`}>
        <div className='flex items-center gap-6'>
          {isReply && (
            // 대댓글인 경우 화살표 아이콘 표시
            <ArrowReply className='w-[24px] h-[24px] mr-[7px]' />
          )}
          <img
            src={'/default-profile.svg'}
            alt={`${comment.writer}의 프로필`}
            className='w-[37px] h-[37px] rounded-full stroke-1 stroke-primary'
          />
          <div className='flex flex-col'>
            <strong className='font-light text-xs leading-[140%] text-black'>
              {comment.writer}
            </strong>
            <p className='font-normal text-[15px] leading-[110%] text-black'>
              {comment.content}
            </p>
            <span className='font-light text-[10px] leading-[140%] text-gray-2'>
              {comment.time}
            </span>
          </div>
        </div>

        <EllipsisVertical
          className='w-[24px] h-[24px] cursor-pointer'
          onClick={() => setShowOptions(true)}
        />

        {showOptions && (
          <div className='absolute z-40 top-full right-0'>
            <PostOptionModal
              showReply
              showReport
              showBlock
              onClose={() => setShowOptions(false)}
              onSelect={(type) => {
                if (type === 'reply') {
                  onReplyClick?.(comment.id, comment.writer);
                } else {
                  setConfirmType(type);
                }
                setShowOptions(false);
              }}
            />
          </div>
        )}
      </div>

      {confirmType && confirmType !== 'edit' && (
        <ConfirmModal
          type={confirmType}
          onCancel={() => setConfirmType(null)}
          onConfirm={async () => {
            if (confirmType === 'delete') {
              try {
                await deleteCommunityComment(comment.id);
                onCommentChange?.();
              } catch (error) {
                console.error('댓글 삭제 실패:', error);
                alert('댓글 삭제에 실패했습니다.');
              }
            }
            // 신고/차단 기능은 추후 구현
            setConfirmType(null);
          }}
        />
      )}

      {comment.children?.map((child) => (
        <CommentItem
          key={child.id}
          comment={child}
          depth={depth + 1}
          onCommentChange={onCommentChange}
          onReplyClick={onReplyClick}
        />
      ))}
    </>
  );
};

export default CommentItem;
