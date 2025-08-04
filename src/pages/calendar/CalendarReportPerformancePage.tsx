import {useOutletContext} from 'react-router-dom';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useEffect} from 'react';

const CalendarReportPerformancePage = () => {
  const {setHeaderProps} = useOutletContext<{
    setHeaderProps: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
  }>();

  useEffect(() => {
    setHeaderProps({
      title: '공연 선택',
      showHomeIcon: true,
      showBottomLine: false,
    });
  }, [setHeaderProps]);

  return <div>CalendarReportPerformancePage</div>;
};

export default CalendarReportPerformancePage;
