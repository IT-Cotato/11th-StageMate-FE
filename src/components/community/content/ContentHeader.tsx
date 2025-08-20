import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import Share from '@/assets/community/share.svg?react';
import {useNavigate, useParams} from 'react-router-dom';
import {useState, useRef} from 'react';
import PostOptionModal from '@/components/modal/PostOptionModal';
import ConfirmModal from '@/components/modal/ConfirmModal';
import {reportCommunity} from '@/api/communityApi';
import {MenuReport} from '@/constant';
import Portal from '@/components/global/Portal';
import ChevronRight from '@/assets/arrows/chevron-right.svg?react';
import useClickOutside from '@/hooks/useClickOutside';
import type {ReportReason} from '@/types/communityDetail';

interface ContentHeaderProps {
  showShare?: boolean;
}

const ContentHeader = ({showShare = true}: ContentHeaderProps) => {
  const navigate = useNavigate();
  const {postId} = useParams();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [showReportConfirm, setShowReportConfirm] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [selectedReportReason, setSelectedReportReason] =
    useState<ReportReason | null>(null);
  const [menuPosition, setMenuPosition] = useState({top: 0, right: 0});
  const menuRef = useRef<HTMLDivElement>(null);
  const shareModalRef = useRef<HTMLDivElement>(null);

  // useClickOutside 훅 사용
  useClickOutside({
    ref: shareModalRef,
    onClickOutside: () => setShowShareModal(false),
  });

  useClickOutside({
    ref: menuRef,
    onClickOutside: () => setShowReportMenu(false),
  });

  // 신고 사유 매핑
  const getReportReason = (id: number): ReportReason => {
    const reasonMap: {[key: number]: ReportReason} = {
      0: 'BAIT',
      1: 'LEAK_IMPERSONATION_FRAUD',
      2: 'COMMERCIAL_AD',
      3: 'ILLEGAL_CONTENT',
      4: 'OBSCENE',
      5: 'ABUSE',
    };
    return reasonMap[id] || 'BAIT';
  };

  const handleReport = async () => {
    if (!postId || !selectedReportReason) return;

    try {
      await reportCommunity({
        targetId: Number(postId),
        targetType: 'POST',
        reason: selectedReportReason,
      });
      alert('신고가 접수되었습니다.');
    } catch (error) {
      console.error('신고 실패:', error);
      alert('신고에 실패했습니다.');
    } finally {
      setShowReportConfirm(false);
      setSelectedReportReason(null);
    }
  };

  const handleBlock = async () => {
    if (!postId) {
      console.error('게시글 ID가 없습니다.');
      alert('차단에 실패했습니다.');
      setShowBlockConfirm(false);
      return;
    }

    try {
      // TODO: 게시글 차단 API 추가 필요
      // await blockPost(Number(postId));
      console.log('게시글 차단 API 호출 필요:', postId);
      alert('게시글이 차단되었습니다.');
    } catch (error) {
      console.error('차단 실패:', error);
      alert('차단에 실패했습니다.');
    } finally {
      setShowBlockConfirm(false);
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
          <div ref={shareModalRef} className='absolute z-40 top-full right-[30px]'>
            <PostOptionModal
              showReport
              showBlock
              onSelect={(type) => {
                if (type === 'report') {
                  const shareElement = document.querySelector(
                    '[data-share-button]'
                  ) as HTMLElement;
                  if (shareElement) {
                    const rect = shareElement.getBoundingClientRect();
                    const scrollY = window.scrollY;
                    const viewportWidth = window.innerWidth;
                    setMenuPosition({
                      top: scrollY + rect.bottom + 20,
                      right: viewportWidth - rect.right,
                    });
                  }
                  setShowReportMenu(true);
                } else if (type === 'block') {
                  setShowBlockConfirm(true);
                }
                setShowShareModal(false);
              }}
              onClose={() => setShowShareModal(false)}
            />
          </div>
        )}
      </div>
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />

      {/* 신고 사유 선택 모달 */}
      {showReportMenu && (
        <Portal>
          <div
            ref={menuRef}
            className='flex flex-col fixed bg-[#fff] rounded-[5px] z-[10001] min-w-168 shadow-lg'
            style={{
              top: menuPosition.top,
              right: menuPosition.right,
            }}
            role='menu'
            aria-label='신고 옵션'>
            <div className='p-4 flex items-center border-b-[0.7px] border-solid border-[#dfe7ef] text-[#000] text-[15px] font-medium leading-[110%]'>
              <ChevronRight className='rotate-90' />
              신고 사유 선택
            </div>
            {MenuReport?.map((report) => (
              <button
                key={report.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedReportReason(getReportReason(report.id));
                  setShowReportMenu(false);
                  setShowReportConfirm(true);
                }}
                className='self-stretch text-start p-7 pl-15 last:border-0 border-b-[0.7px] border-solid border-[#dfe7ef] text-[#000] text-[15px] font-medium leading-[110%] hover:cursor-pointer'>
                {report.text}
              </button>
            ))}
          </div>
        </Portal>
      )}

      {/* 신고 확인 모달 */}
      {showReportConfirm && (
        <Portal>
          <ConfirmModal
            type='report'
            onCancel={() => {
              setShowReportConfirm(false);
              setSelectedReportReason(null);
            }}
            onConfirm={handleReport}
          />
        </Portal>
      )}

      {/* 차단 확인 모달 */}
      {showBlockConfirm && (
        <Portal>
          <ConfirmModal
            type='block'
            onCancel={() => setShowBlockConfirm(false)}
            onConfirm={handleBlock}
          />
        </Portal>
      )}
    </div>
  );
};

export default ContentHeader;
