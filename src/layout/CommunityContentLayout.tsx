/**
 * 커뮤니티 글 작성 페이지, 글 세부 내용 페이지의 레이아웃
 */

import ContentHeader from '@/components/community/content/ContentHeader';
import ContentFooterBar from '@/components/community/content/ContentFooterBar';
import {Outlet, useMatch} from 'react-router-dom';
import {useCommunityPostSafe} from '@/components/community/context/useCommunityPost';
import CommunityPostProvider from '@/components/community/context/CommunityPostProvider';

const FooterBarWrapper = () => {
  const context = useCommunityPostSafe();

  // URL에서 postId가 있는지 확인 (예: /community/daily/123)
  const isPostDetailPage = useMatch('/community/:category/:postId');
  // 게시글 상세 페이지가 아니면 하단바 숨김
  if (!isPostDetailPage) {
    return null;
  }

  // Context가 없으면 기본값으로 하단바 표시
  if (!context) {
    return (
      <ContentFooterBar
        post={{
          isLiked: false,
          commentCount: 0,
          isScrapped: false,
        }}
        onLikeClick={() => {}}
        onScrapClick={() => {}}
        likeCount={0}
        scrapCount={0}
      />
    );
  }


  return (
    <ContentFooterBar
      post={{
        isLiked: context.isLiked || false,
        commentCount: context.commentCount || 0,
        isScrapped: context.isScrapped || false,
      }}
      onLikeClick={context.onLikeClick}
      onScrapClick={context.onScrapClick}
      likeCount={context.likeCount || 0}
      scrapCount={context.scrapCount || 0}
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
