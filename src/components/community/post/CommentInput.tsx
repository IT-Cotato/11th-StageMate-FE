import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {createCommunityComment} from '@/api/communityApi';
import Send from '@/assets/community/send.svg?react';

interface CommentInputProps {
  onCommentCreated?: () => void;
  parentId?: number | null;
  placeholder?: string;
}

const CommentInput = ({
  onCommentCreated,
  parentId = null,
  placeholder = '댓글을 입력하세요.',
}: CommentInputProps) => {
  const {postId} = useParams();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = comment.trim();
    console.log('CommentInput handleSubmit - parentId:', parentId);
    if (!trimmed || !postId || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const requestData = {
        content: trimmed,
        parentId,
      };
      console.log('API 요청 데이터:', requestData);
      await createCommunityComment(Number(postId), requestData);
      setComment('');
      onCommentCreated?.();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='flex items-center justify-between w-full bg-[#EBEBEB] px-8 py-[11px]'>
      <div className='flex items-center gap-[20px]'>
        {/* TODO: 로그인 시 사용자 프로필 이미지로 대체 */}
        <img
          src='/default-profile.svg'
          alt='프로필 이미지'
          className='w-[37px] h-[37px] rounded-full'
        />
        <input
          type='text'
          placeholder={placeholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          className='w-full text-base text-gray-2 outline-none'
        />
      </div>

      <Send
        onClick={handleSubmit}
        className={`inline-block ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        role='button'
        aria-label='댓글 등록'
      />
    </div>
  );
};

export default CommentInput;
