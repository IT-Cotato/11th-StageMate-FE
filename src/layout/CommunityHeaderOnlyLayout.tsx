import ContentHeader from '@/components/community/content/ContentHeader';
import {Outlet} from 'react-router-dom';

const CommunityHeaderOnlyLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
      <div className='relative w-full max-w-[600px]'>
        <ContentHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CommunityHeaderOnlyLayout;
