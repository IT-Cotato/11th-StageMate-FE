/**
 * 게시글 상세 페이지 내 댓글 전체 목록을 렌더링하는 컴포넌트
 * - mockComments 데이터를 기반으로 댓글/대댓글 목록을 출력
 * - 각 댓글은 CommentItem 컴포넌트를 통해 렌더링됨
 */
import {mockComments} from '@/mocks/mockComments';
import CommentItem from './CommentItem';

const PostComment = () => {
  return (
    <div className='flex flex-col w-full'>
      {mockComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostComment;
