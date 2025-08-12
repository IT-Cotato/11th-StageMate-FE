import Portal from '@/components/global/Portal';
import useClickOutside from '@/hooks/useClickOutside';
import {useCallback, useRef, useState} from 'react';
import File from '@/assets/archive/archive-ticket-file.svg?react';
import Camera from '@/assets/community/editor-icons/editor-icon-camera.svg?react';
import Modal from '../global/Modal';
import {cameraModal} from '@/constants/modalConstants';
import {useMutation} from '@tanstack/react-query';
import {putProfileImage} from '@/api/mypageApi';
import {useAuthStore} from '@/stores/authStore';
import LoadingOverlay from '../global/LoadingOverlay';

interface ChangeProfileModalProps {
  onBackdropClick: () => void;
}

const ChangeProfileModal = ({onBackdropClick}: ChangeProfileModalProps) => {
  const targetRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const {setProfileImage} = useAuthStore();

  const changeProfileMutation = useMutation({
    mutationFn: putProfileImage,
    onSuccess: (data) => {
      setProfileImage(data);
      onBackdropClick();
    },
    onError: () => {
      console.error('프로필 이미지 업로드 실패');
    },
  });

  useClickOutside({
    ref: targetRef,
    onClickOutside: onBackdropClick,
    exclude: (target) => {
      // Modal 영역 클릭 시 제외 (Portal로 렌더링된 Modal 체크)
      return target.closest('[role="dialog"]') !== null;
    },
  });

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);
      changeProfileMutation.mutate(formData);
      e.target.value = '';
    },
    [changeProfileMutation]
  );

  const handleCameraClick = useCallback(() => {
    if (!isMobile) {
      setShowCameraModal(true);
    } else {
      cameraInputRef.current?.click();
    }
  }, [isMobile]);

  const handleCameraModalClose = useCallback(() => {
    setShowCameraModal(false);
  }, []);

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
              onClick={() => fileInputRef.current?.click()}
              type='button'
              disabled={changeProfileMutation.isPending}>
              <div className='flex items-center justify-center w-100 h-100 bg-gray-1 hover:opacity-80 transition-opacity'>
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
            <button
              className='flex flex-col justify-center items-center gap-14 min-w-127 cursor-pointer'
              onClick={handleCameraClick}
              type='button'
              disabled={changeProfileMutation.isPending}>
              <div className='flex items-center justify-center w-100 h-100 bg-gray-1 hover:opacity-80 transition-opacity'>
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
              onRightClick={handleCameraModalClose}
              onBackdropClick={handleCameraModalClose}
              closeOnBackdrop={true}
            />
          )}

          {changeProfileMutation.isPending && <LoadingOverlay />}

          {changeProfileMutation.isError && (
            <Modal
              content='이미지 업로드에 실패했습니다.'
              rightText='확인'
              onRightClick={changeProfileMutation.reset}
              onBackdropClick={changeProfileMutation.reset}
              closeOnBackdrop={true}
            />
          )}
        </div>
      </div>
    </Portal>
  );
};

export default ChangeProfileModal;
