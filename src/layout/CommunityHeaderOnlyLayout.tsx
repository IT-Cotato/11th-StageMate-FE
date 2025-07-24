import ContentHeader from '@/components/community/content/ContentHeader';
import {Outlet} from 'react-router-dom';

const CommunityHeaderOnlyLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
      <div className='relative w-full max-w-[600px]'>
        <header className='w-full max-w-[600px] fixed top-0 left-1/2 -translate-x-1/2'>
          <ContentHeader showShare={false} />
        </header>
        <main className='pt-[93px]'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CommunityHeaderOnlyLayout;
