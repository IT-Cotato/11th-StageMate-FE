/**
 * 게시글 상세 페이지 내 댓글 전체 목록을 렌더링하는 컴포넌트
 * - 게시글 상세 정보에서 댓글 데이터를 받아와 댓글/대댓글 목록을 출력
 * - 각 댓글은 CommentItem 컴포넌트를 통해 렌더링됨
 */
import type {CommunityComment} from '@/types/communityDetail';
import CommentItem from './CommentItem';

interface PostCommentProps {
  comments: CommunityComment[];
  onCommentChange?: () => void;
  onReplyClick?: (commentId: number, authorName: string) => void;
  selectedCommentId?: number | null;
}

const PostComment = ({comments, onCommentChange, onReplyClick, selectedCommentId}: PostCommentProps) => {
  const handleCommentChange = () => {
    onCommentChange?.();
  };

  return (
    <div className='flex flex-col w-full'>
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          onCommentChange={handleCommentChange}
          onReplyClick={onReplyClick}
          isSelected={selectedCommentId === comment.id}
        />
      ))}
      {comments.length === 0 && (
        <div className='text-center py-8 text-gray-500'>
          첫 번째 댓글을 작성해보세요.
        </div>
      )}
    </div>
  );
};

export default PostComment;
