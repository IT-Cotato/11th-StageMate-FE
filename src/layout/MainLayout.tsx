import MainNavigationBar from '@/components/global/MainNavigationBar';
import {Outlet} from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
      <div className='w-full max-w-[600px] sm:pb-60 pb-44'>
        <Outlet />
      </div>

      <footer className='w-full max-w-[600px] fixed bottom-0 left-1/2 -translate-x-1/2'>
        <MainNavigationBar />
      </footer>
    </div>
  );
};

export default MainLayout;
