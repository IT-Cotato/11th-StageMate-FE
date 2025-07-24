import {useState} from 'react';
import Send from '@/assets/community/send.svg?react';

const CommentInput = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    const trimmed = comment.trim();
    if (!trimmed) return;

    try {
      // TODO: 댓글 등록 API 연결
      console.log('댓글 등록:', trimmed);
      setComment('');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      // TODO: 사용자에게 알림 처리
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
          src='/img/profile/mock-profile6.svg'
          alt='프로필 이미지'
          className='w-[37px] h-[37px] rounded-full'
        />
        <input
          type='text'
          placeholder='댓글을 입력하세요.'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          className='w-full text-base text-gray-2 outline-none'
        />
      </div>

      <Send
        onClick={handleSubmit}
        className='inline-block cursor-pointer'
        role='button'
        aria-label='댓글 등록'
      />
    </div>
  );
};

export default CommentInput;
