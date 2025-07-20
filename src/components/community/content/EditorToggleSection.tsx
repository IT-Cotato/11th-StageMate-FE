import Lock from '@/assets/community/editor-icons/editor-icon-lock.svg?react';
import Bell from '@/assets/community/editor-icons/editor-icon-bell.svg?react';
import EditorToggleButton from './EditorToggleButton';

const EditorToggleSection = () => {
  return (
    <div className='flex flex-col px-48 py-30 gap-12'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex gap-20 items-center'>
          <Lock />
          <p className='font-normal text-2xl'>회원 전용</p>
        </div>
        <EditorToggleButton />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-20 items-center'>
          <Bell />
          <p className='font-normal text-2xl'>알림</p>
        </div>
        <EditorToggleButton />
      </div>
    </div>
  );
};

export default EditorToggleSection;
