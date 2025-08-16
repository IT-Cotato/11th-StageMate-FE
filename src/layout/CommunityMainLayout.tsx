/**
 * 상단 고정 커뮤니티 헤더 포함
 * 커뮤니티 메인 페이지, 게시판 목록 페이지, 채팅방
 */

import CommunityMainHeader from '@/components/community/common/CommunityMainHeader';
import {Outlet} from 'react-router-dom';

const CommunityMainLayout = () => {
  return (
    <div className='w-full'>
      <div className='fixed top-0 max-w-[600px] w-full bg-white z-50'>
        <CommunityMainHeader showIcons={false} />
      </div>

      <main className='pt-90 px-16'>
        <Outlet />
      </main>
    </div>
  );
};

export default CommunityMainLayout;
