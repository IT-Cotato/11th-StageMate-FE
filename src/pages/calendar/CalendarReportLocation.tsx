import {useOutletContext} from 'react-router-dom';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useEffect} from 'react';

const CalendarReportLocationPage = () => {
  const {setHeaderProps} = useOutletContext<{
    setHeaderProps: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
  }>();

  useEffect(() => {
    setHeaderProps({
      title: '장소 선택',
      showHomeIcon: true,
      showBottomLine: false,
    });
  }, [setHeaderProps]);

  return <div>CalendarReportLocationPage</div>;
};

export default CalendarReportLocationPage;
