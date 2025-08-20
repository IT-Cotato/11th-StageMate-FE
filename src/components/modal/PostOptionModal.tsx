import ArrowReply from '@/assets/community/modal-icons/arrow-reply.svg?react';
import Ban from '@/assets/community/modal-icons/ban.svg?react';
import Exclamation from '@/assets/community/modal-icons/exclamation.svg?react';
import Pencil from '@/assets/community/modal-icons/pencil.svg?react';
import Trash from '@/assets/community/modal-icons/trash.svg?react';
import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';

interface PostOptionModalProps {
  showReply?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showReport?: boolean;
  showBlock?: boolean;
  onSelect: (type: 'edit' | 'delete' | 'report' | 'block') => void;
  onClose: () => void;
}

const PostOptionModal = ({
  showReply,
  showEdit,
  showDelete,
  showReport,
  showBlock,
  onSelect,
  onClose,
}: PostOptionModalProps) => {
  return (
    <div className='flex flex-col bg-[#ffffff] py-4 rounded-[5px] z-50 divide-y divide-gray-1'>
      {showReply && (
        <button className='group flex items-center justify-between gap-7 px-5 py-2 cursor-pointer'>
          <div className='flex items-center gap-7'>
            <ArrowReply className='w-24 h-24' />
            <span>답글 달기</span>
          </div>
          <ChevronRight className='w-16 h-16 opacity-0 group-hover:opacity-100 transition' />
        </button>
      )}

      {showEdit && (
        <button 
          onClick={() => {
            onSelect('edit');
            onClose();
          }}
          className='group flex items-center justify-between gap-7 px-5 py-2 cursor-pointer'>
          <div className='flex items-center gap-7'>
            <Pencil className='w-24 h-24' />
            <span>수정</span>
          </div>
          <ChevronRight className='w-16 h-16 opacity-0 group-hover:opacity-100 transition' />
        </button>
      )}

      {showDelete && (
        <button
          onClick={() => {
            onSelect('delete');
            onClose();
          }}
          className='group flex items-center justify-between gap-7 px-5 py-2 cursor-pointer'>
          <div className='flex items-center gap-7'>
            <Trash className='w-24 h-24' />
            <span>삭제</span>
          </div>
          <ChevronRight className='w-16 h-16 opacity-0 group-hover:opacity-100 transition' />
        </button>
      )}

      {showReport && (
        <button
          onClick={() => {
            onSelect('report');
            onClose();
          }}
          className='group flex items-center justify-between gap-7 px-5 py-2 cursor-pointer'>
          <div className='flex items-center gap-7'>
            <Exclamation className='w-24 h-24' />
            <span className='text-red'>신고</span>
          </div>
          <ChevronRight className='w-16 h-16 opacity-0 group-hover:opacity-100 transition' />
        </button>
      )}

      {showBlock && (
        <button
          onClick={() => {
            onSelect('block');
            onClose();
          }}
          className='group flex items-center justify-between gap-7 px-5 py-2 cursor-pointer'>
          <div className='flex items-center gap-7'>
            <Ban className='w-24 h-24' />
            <span className='text-red'>차단</span>
          </div>
          <ChevronRight className='w-16 h-16 opacity-0 group-hover:opacity-100 transition' />
        </button>
      )}
    </div>
  );
};

export default PostOptionModal;
