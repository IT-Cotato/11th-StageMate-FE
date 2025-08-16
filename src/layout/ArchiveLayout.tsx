import CommunityMainHeader from '@/components/community/common/CommunityMainHeader';
import MainNavigationBar from '@/components/global/MainNavigationBar';
import {Outlet} from 'react-router-dom';

const ArchiveLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden relative'>
      <div className='relative w-full max-w-[600px] pb-[90px]'>
        <div className='fixed top-0 left-1/2 transform -translate-x-1/2 max-w-[600px] w-full bg-white z-50'>
          <CommunityMainHeader />
        </div>

        <main className='px-20'>
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
