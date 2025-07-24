import {useState} from 'react';
import Send from '@/assets/community/send.svg?react';

const CommentInput = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) return;
    // TODO: 댓글 등록 API 연결
    setComment('');
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
          className='font-normal text-[16px] leading-[110%] text-gray-2'
        />
      </div>

      <Send onClick={handleSubmit} className='inline-block mr-1' />
    </div>
  );
};

export default CommentInput;
