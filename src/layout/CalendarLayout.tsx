import CommunityMainHeader from '@/components/community/common/CommunityMainHeader';
import {useState} from 'react';
import PageHeader from '@/components/global/PageHeader';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import MainNavigationBar from '@/components/global/MainNavigationBar';
import {Outlet} from 'react-router-dom';

const CalendarLayout = () => {
  const [headerProps, setHeaderProps] = useState<PageHeaderProps>({
    title: '',
    showHomeIcon: true,
    showBottomLine: true,
  });

  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
      <div className='relative w-full max-w-[600px]'>
        <div className='fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] z-50 bg-white flex flex-col gap-20'>
          <CommunityMainHeader />
          <PageHeader {...headerProps} />
        </div>

        <main className='pt-[140px] px-20 pb-[90px]'>
          <Outlet context={{setHeaderProps}} />
        </main>

        <footer className='w-full max-w-[600px] fixed bottom-0 left-1/2 -translate-x-1/2 z-40'>
          <MainNavigationBar />
        </footer>
      </div>
    </div>
  );
};

export default CalendarLayout;
