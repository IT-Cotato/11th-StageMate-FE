import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import Share from '@/assets/community/share.svg?react';
import {useNavigate} from 'react-router-dom';
import {useState, useRef} from 'react';
import PostOptionModal from '@/components/modal/PostOptionModal';
import useClickOutside from '@/hooks/useClickOutside';

interface ContentHeaderProps {
  showShare?: boolean;
}

const ContentHeader = ({showShare = true}: ContentHeaderProps) => {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const shareModalRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: shareModalRef,
    onClickOutside: () => setShowShareModal(false),
  });

  const handleCopyUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert('URL이 복사되었습니다.');
    } catch (error) {
      console.error('URL 복사 실패:', error);
      alert('URL 복사에 실패했습니다.');
    }
  };


  return (
    <div className='flex flex-col w-full bg-white'>
      <div className='w-full flex flex-row justify-between sm:px-30 sm:py-15 px-15 py-[7.5px] relative'>
        <ChevronLeft
          onClick={() => navigate(-1)}
          className='cursor-pointer w-[50px] h-[50px]'
        />
        {showShare && (
          <Share
            className='w-[50px] h-[50px] cursor-pointer'
            onClick={() => setShowShareModal(true)}
            data-share-button
          />
        )}

        {/* Share 옵션 모달 */}
        {showShareModal && (
          <div
            ref={shareModalRef}
            className='absolute z-40 top-full right-[30px]'>
            <PostOptionModal
              showShare
              onSelect={(type) => {
                if (type === 'share') {
                  handleCopyUrl();
                }
                setShowShareModal(false);
              }}
              onClose={() => setShowShareModal(false)}
            />
          </div>
        )}
      </div>
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />
    </div>
  );
};

export default ContentHeader;
