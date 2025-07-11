import NavigationBar from '@/components/NavigationBar';
import {Outlet} from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className='w-full min-h-screen flex justify-center'>
      <div className='w-full max-w-[600px] pb-[90px]'>
        <Outlet />
      </div>

      <footer className='w-full max-w-[600px] fixed bottom-0 left-1/2 -translate-x-1/2'>
        <NavigationBar />
      </footer>
    </div>
  );
}
