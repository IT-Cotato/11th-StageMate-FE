import {useEffect} from 'react';
import Portal from '@/components/global/Portal';

interface PopupProps {
  title?: string;
  content?: string;
  contentRed?: string;
  leftText?: string;
  rightText: string;
  onLeftClick?: () => void;
  onRightClick: () => void;
  onBackdropClick?: () => void; // 배경 클릭 시 호출
  closeOnEscape?: boolean; // ESC 키로 닫기 (기본값: true)
  closeOnBackdrop?: boolean; // 배경 클릭으로 닫기 (기본값: false)
}

const Popup = ({
  title,
  content,
  contentRed,
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
  onBackdropClick,
  closeOnEscape = true,
  closeOnBackdrop = false,
}: PopupProps) => {
  // ESC 키 처리
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBackdropClick?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, onBackdropClick]);

  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onBackdropClick?.();
    }
  };

  return (
    <Portal>
      <div
        className='fixed inset-0 max-w-[600px] m-auto bg-[#979797]/44 flex justify-center items-center backdrop-blur-[2px]'
        onClick={handleBackdropClick}
        role='dialog'
        aria-modal='true'>
        <div
          className='flex w-478 py-41 px-12 flex-col justify-center items-center gap-35 bg-[#fff] border-1 border-solid border-primary'
          onClick={(e) => e.stopPropagation()}>
          {title && (
            <h1 className='text-[#000] text-3xl font-bold leading-[110%]'>
              {title}
            </h1>
          )}

          {content && (
            <p className='text-[#000] text-center text-[19px] leading-[120%] whitespace-pre-line'>
              {content}
            </p>
          )}
          {contentRed && (
            <p className='text-[#fa0000] text-center text-[15px] leading-[140%] whitespace-pre-line'>
              {contentRed}
            </p>
          )}

          <div className='flex items-center gap-54'>
            {leftText && (
              <button
                onClick={onLeftClick}
                className='flex w-112 h-36 py-5 justify-center items-center text-center text-gray-2 text-[17px] leading-[140%] rounded-[5px] bg-white hover:cursor-pointer'>
                {leftText}
              </button>
            )}
            <button
              onClick={onRightClick}
              className='flex w-112 h-36 py-5 justify-center items-center text-center text-white text-[17px] leading-[140%] rounded-[5px] bg-primary hover:cursor-pointer'>
              {rightText}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Popup;
