import Portal from '@/components/global/Portal';
import useClickOutside from '@/hooks/useClickOutside';
import {useRef} from 'react';

interface ChangeProfileModalProps {
  onBackdropClick: () => void;
}

const ChangeProfileModal = ({onBackdropClick}: ChangeProfileModalProps) => {
  const targetRef = useRef(null);

  useClickOutside({ref: targetRef, onClickOutside: onBackdropClick});

  return (
    <Portal>
      <div className='fixed inset-0 max-w-[600px] m-auto bg-[#979797]/44 flex justify-center items-end backdrop-blur-[2px]'>
        <div
          ref={targetRef}
          className='flex w-full pt-20 pb-47 flex-col justify-center items-center bg-[#fff] border-1 border-solid border-primary'
          onClick={(e) => e.stopPropagation()}>
          프로필 사진 변경
        </div>
      </div>
    </Portal>
  );
};

export default ChangeProfileModal;
