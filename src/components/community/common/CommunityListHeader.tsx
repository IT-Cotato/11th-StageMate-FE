import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import WritePost from '@/assets/nav-icons/write-post.svg?react';

interface Props {
  title: string;
  onBack: () => void;
  onWrite: () => void;
  className?: string;
}

export default function CommunityListHeader({
  title,
  onBack,
  onWrite,
  className,
}: Props) {
  return (
    <div className={`flex justify-between items-center ${className ?? ''}`}>
      <div className='flex items-center'>
        <button
          type='button'
          aria-label='뒤로가기'
          className='flex items-center justify-center w-[50px] h-[50px]'
          onClick={onBack}>
          <ChevronLeft className='w-full h-full' />
        </button>
        <span className='font-bold text-xl leading-[140%]'>{title}</span>
      </div>

      {/* 오른쪽: '게시글 작성' */}
      <button
        type='button'
        className='flex items-center gap-[8px]'
        onClick={onWrite}>
        <WritePost className='w-[19px] h-[19px]' />
        <span className='font-bold text-xl leading-[140%]'>게시글 작성</span>
      </button>
    </div>
  );
}
