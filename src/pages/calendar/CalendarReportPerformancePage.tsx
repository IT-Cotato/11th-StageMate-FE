import {useOutletContext, useNavigate} from 'react-router-dom';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useEffect, useState} from 'react';
import PerformanceCardList from '@/components/main/PerformanceCardList';
import {useReportFormStore} from '@/stores/useReportFormStore';

const CalendarReportPerformancePage = () => {
  const {setHeaderProps} = useOutletContext<{
    setHeaderProps: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
  }>();
  const navigate = useNavigate();
  const {setForm} = useReportFormStore();

  useEffect(() => {
    setHeaderProps({
      title: '공연 선택',
      showHomeIcon: true,
      showBottomLine: false,
    });
  }, [setHeaderProps]);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <div>
      <PerformanceCardList
        mode='selectable'
        selectedKey={selectedKey}
        onSelect={(item) => {
          setSelectedKey(item.performanceName);
          setForm({
            performance: item.performanceName,
            theaterName: item.theaterName,
          });
          navigate(-1);
        }}
      />
    </div>
  );
};

export default CalendarReportPerformancePage;
