import CommunityMainHeader from '@/components/community/common/CommunityMainHeader';
import MainNavigationBar from '@/components/global/MainNavigationBar';
import {Outlet} from 'react-router-dom';

const ArchiveLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
      <div className='relative w-full max-w-[600px] pb-[90px]'>
        <CommunityMainHeader />
        <main className='pt-90 px-20'>
          <Outlet />
        </main>
        <footer className='w-full max-w-[600px] fixed bottom-0 left-1/2 -translate-x-1/2'>
          <MainNavigationBar />
        </footer>
      </div>
    </div>
  );
};
export default ArchiveLayout;
