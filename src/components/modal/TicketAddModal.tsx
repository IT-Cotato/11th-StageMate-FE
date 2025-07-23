import Image from '@/assets/archive/archive-ticket-image.svg?react';
import File from '@/assets/archive/archive-ticket-file.svg?react';
import Camera from '@/assets/community/editor-icons/editor-icon-camera.svg?react';
import useScrollLockWithRestore from '@/hooks/useScrollLockwithRestore';
import React, {useRef} from 'react';

interface TicketAddModalProps {
  onComplete: (imageUrl: string) => void;
  setShowCameraModal: () => void;
}

const TicketAddModal = ({
  onComplete,
  setShowCameraModal,
}: TicketAddModalProps) => {
  useScrollLockWithRestore(); // 스크롤 락 처리
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const handleCameraClick = () => {
    if (!isMobile) {
      setShowCameraModal();
      return;
    } else {
      cameraInputRef.current?.click();
    }
  }; // 이미지 검색
  // todo

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onComplete(imageUrl);
    }
    e.target.value = '';
  };

  return (
    <div className='fixed sm:bottom-[60px] bottom-[45px] left-0 w-full flex justify-center items-end z-50'>
      <div className='sm:w-full sm:h-[302px] h-200 bg-white flex flex-col items-center shadow-sm sm:px-60 sm:py-20 px-30 py-10 gap-40 border-[1px] border-primary'>
        <h1 className='sm:text-[27px] text-xl font-medium'>티켓 추가</h1>
        <div className='flex flex-row gap-47'>
          {/** 이미지 검색 */}
          <button className='flex flex-col items-center sm:w-[127px] w-100'>
            <div className='bg-gray-1 sm:w-100 sm:h-100 w-[50px] h-[50px] flex items-center justify-center cursor-pointer'>
              <Image className='text-primary sm:w-60 sm:h-60 w-45 h-45' />
            </div>
            <span className='sm:text-xl text-sm'>이미지 검색하기</span>
          </button>
          {/** 파일에서 선택(갤러리 선택) */}
          <button
            className='flex flex-col items-center sm:w-[127px] w-100'
            onClick={() => fileInputRef.current?.click()}>
            <div className='bg-gray-1 sm:w-100 sm:h-100 w-[50px] h-[50px] flex items-center justify-center cursor-pointer'>
              <File className='text-primary sm:w-45 sm:h-45 w-30 h-30' />
            </div>
            <span className='sm:text-xl text-sm'>파일에서 선택</span>
          </button>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {/** 카메라 연동 - 웹 접근 제한 */}
          <button className='flex flex-col items-center sm:w-[127px] w-100'>
            <div
              onClick={() => {
                handleCameraClick();
              }}
              className='bg-gray-1 sm:w-100 sm:h-100 w-[50px] h-[50px] flex justify-center items-center cursor-pointer'>
              <Camera className='text-primary sm:w-60 sm:h-60 w-45 h-45' />
            </div>
            <span className='sm:text-xl text-sm'>촬영하기</span>
          </button>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            capture='environment'
            ref={cameraInputRef}
            onChange={handleCameraClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketAddModal;
