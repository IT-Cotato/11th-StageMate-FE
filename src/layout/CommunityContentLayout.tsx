/**
 * 커뮤니티 글 작성 페이지, 게시글 상세 페이지의 레이아웃
 */

import ContentHeader from '@/components/community/content/ContentHeader';
import ContentFooterBar from '@/components/community/content/ContentFooterBar';
import {Outlet, useMatch, useParams} from 'react-router-dom';
import {useCommunityPostSafe} from '@/components/community/context/useCommunityPost';
import CommunityPostProvider from '@/components/community/context/CommunityPostProvider';
import {useScrapStore} from '@/stores/useScrapStore';

const FooterBarWrapper = () => {
  const context = useCommunityPostSafe();
  const {postId} = useParams();
  const {isLiked, isScraped, getCounts} = useScrapStore();

  // URL에서 postId가 있는지 확인 (예: /community/daily/123)
  const isPostDetailPage = useMatch('/community/:category/:postId');
  // 게시글 상세 페이지가 아니면 하단바 숨김
  if (!isPostDetailPage) {
    return null;
  }

  // 게시글 상세페이지이면 전역 상태에서 데이터 가져오기
  let likeCount = 0;
  let scrapCount = 0;
  let commentCount = 0;
  let isCurrentlyLiked = false;
  let isCurrentlyScrapped = false;

  if (postId) {
    const postIdNum = Number(postId);
    const counts = getCounts(postIdNum, 'community');
    likeCount = counts.likeCount;
    scrapCount = counts.scrapCount;
    commentCount = counts.commentCount;
    isCurrentlyLiked = isLiked(postIdNum, 'community');
    isCurrentlyScrapped = isScraped(postIdNum, 'community');
  }

  return (
    <ContentFooterBar
      post={{
        isLiked: isCurrentlyLiked,
        commentCount: commentCount,
        isScrapped: isCurrentlyScrapped,
      }}
      onLikeClick={context?.onLikeClick || (() => {})}
      onScrapClick={context?.onScrapClick || (() => {})}
      likeCount={likeCount}
      scrapCount={scrapCount}
    />
  );
};

const CommunityContentLayout = () => {
  return (
    <CommunityPostProvider>
      <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
        <div className='relative w-full max-w-[600px] pb-[90px] shadow-2xl'>
          <header className='w-full max-w-[600px] fixed top-0 left-1/2 -translate-x-1/2 z-50'>
            <ContentHeader showShare={true} />
          </header>

          <main className='px-[16px] pt-[93px]'>
            <Outlet />
          </main>
          <footer className='w-full max-w-[600px] fixed bottom-0 left-1/2 -translate-x-1/2 z-50'>
            <FooterBarWrapper />
          </footer>
        </div>
      </div>
    </CommunityPostProvider>
  );
};

export default CommunityContentLayout;
