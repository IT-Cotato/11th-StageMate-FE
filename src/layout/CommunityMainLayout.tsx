/**
 * 상단 고정 커뮤니티 헤더 포함
 * 커뮤니티 메인 페이지, 게시판 목록 페이지, 채팅방
 */

import CommunityMainHeader from '@/components/community/common/CommunityMainHeader';
import {Outlet} from 'react-router-dom';

const CommunityMainLayout = () => {
  return (
    <div className='w-full'>
      <CommunityMainHeader />
      <main className='pt-90'>
        <Outlet />
      </main>
    </div>
  );
};

export default CommunityMainLayout;
