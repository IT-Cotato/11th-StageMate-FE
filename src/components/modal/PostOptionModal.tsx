import ArrowReply from '@/assets/community/modal-icons/arrow-reply.svg?react';
import Ban from '@/assets/community/modal-icons/ban.svg?react';
import Exclamation from '@/assets/community/modal-icons/exclamation.svg?react';
import Pencil from '@/assets/community/modal-icons/pencil.svg?react';
import Trash from '@/assets/community/modal-icons/trash.svg?react';

interface PostOptionModalProps {
  showReply?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showReport?: boolean;
  showBlock?: boolean;
}
const PostOptionModal = ({
  showReply,
  showEdit,
  showDelete,
  showReport,
  showBlock,
}: PostOptionModalProps) => {
  return (
    <div className='flex flex-col bg-[#FFFFFF] divide-y divide-gray-1 py-4 rounded-[5px] z-50'>
      {showReply && (
        <button className='flex items-center gap-7 px-5 cursor-pointer'>
          <ArrowReply className='w-24 h-24' />
          <span>답글 달기</span>
        </button>
      )}

      {showEdit && (
        <button className='flex items-center gap-7 px-5 cursor-pointer'>
          <Pencil className='w-24 h-24' />
          <span>수정</span>
        </button>
      )}

      {showDelete && (
        <button className='flex items-center gap-7 px-5 cursor-pointer'>
          <Trash className='w-24 h-24' />
          <span>삭제</span>
        </button>
      )}

      {showReport && (
        <button className='flex items-center gap-7 px-5 cursor-pointer'>
          <Exclamation className='w-24 h-24' />
          <span className='text-red'>신고</span>
        </button>
      )}

      {showBlock && (
        <button className='flex items-center gap-7 px-5 cursor-pointer'>
          <Ban className='w-24 h-24' />
          <span className='text-red'>차단</span>
        </button>
      )}
    </div>
  );
};

export default PostOptionModal;
