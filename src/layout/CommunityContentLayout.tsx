/**
 * 커뮤니티 글 작성 페이지, 글 세부 내용 페이지의 레이아웃
 */

import ContentHeader from '@/components/community/content/ContentHeader';
import ContentFooterBar from '@/components/community/content/ContentFooterBar';
import {Outlet} from 'react-router-dom';

const CommunityContentLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
      <div className='relative w-full max-w-[600px] pb-[90px]'>
        <ContentHeader />
        <main>
          <Outlet />
        </main>
        <footer className='w-full max-w-[600px] fixed bottom-0 left-1/2 -translate-x-1/2'>
          <ContentFooterBar />
        </footer>
      </div>
    </div>
  );
};

export default CommunityContentLayout;
