import Portal from '@/components/global/Portal';
import useClickOutside from '@/hooks/useClickOutside';
import {useRef, useState} from 'react';
import File from '@/assets/archive/archive-ticket-file.svg?react';
import Camera from '@/assets/community/editor-icons/editor-icon-camera.svg?react';
import Modal from '../global/Modal';
import {cameraModal} from '@/constants/modalConstants';

interface ChangeProfileModalProps {
  onBackdropClick: () => void;
}

const ChangeProfileModal = ({onBackdropClick}: ChangeProfileModalProps) => {
  const targetRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useClickOutside({
    ref: targetRef,
    onClickOutside: onBackdropClick,
    exclude: (target) => {
      // Modal 영역 클릭 시 제외 (Portal로 렌더링된 Modal 체크)
      return target.closest('[role="dialog"]') !== null;
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log('formData', formData);
    e.target.value = '';
  };

  const handleCameraClick = () => {
    if (!isMobile) {
      setShowCameraModal(true);
    } else {
      cameraInputRef.current?.click();
    }
  };

  return (
    <Portal>
      <div className='fixed inset-0 max-w-[600px] m-auto bg-[#979797]/44 flex justify-center items-end backdrop-blur-[2px]'>
        <div
          ref={targetRef}
          className='flex w-full pt-20 pb-47 flex-col justify-center items-center gap-49 bg-[#fff] border-1 border-solid border-primary'
          onClick={(e) => e.stopPropagation()}>
          <h1 className='text-[#000] text-[27px] font-medium leading-[140%]'>
            프로필 사진 변경
          </h1>

          <div className='flex justify-center items-center gap-47'>
            {/* 파일에서 선택(갤러리 선택) */}
            <button
              className='flex flex-col justify-center items-center gap-14 min-w-127 cursor-pointer'
              onClick={() => fileInputRef.current?.click()}>
              <div className='flex items-center justify-center w-100 h-100 bg-gray-1'>
                <File className='text-primary w-37' />
              </div>
              <p className='text-xl leading-[140%]'>파일에서 선택</p>
            </button>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {/* 카메라 연동 - 웹 접근 제한 */}
            <button className='flex flex-col justify-center items-center gap-14 min-w-127 cursor-pointer'>
              <div
                onClick={() => {
                  handleCameraClick();
                }}
                className='flex items-center justify-center w-100 h-100 bg-gray-1'>
                <Camera className='text-primary w-60 h-60' />
              </div>
              <p className='text-xl leading-[140%]'>촬영하기</p>
            </button>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              capture='environment'
              ref={cameraInputRef}
              onChange={handleFileChange}
            />
          </div>

          {showCameraModal && (
            <Modal
              content={cameraModal.content}
              rightText='확인'
              onRightClick={() => setShowCameraModal(false)}
              onBackdropClick={() => setShowCameraModal(false)}
              closeOnBackdrop={true}
            />
          )}
        </div>
      </div>
    </Portal>
  );
};

export default ChangeProfileModal;
