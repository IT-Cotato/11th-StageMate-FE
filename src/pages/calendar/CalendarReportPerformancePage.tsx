import {useOutletContext, useNavigate} from 'react-router-dom';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useEffect, useState} from 'react';
import PerformanceCardList from '@/components/main/PerformanceCardList';
import {useReportFormStore} from '@/stores/useReportFormStore';
import type {Performance} from '@/types/performance';

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

        onSelect={(item: Performance) => {
          if (!item.id) {
            console.error('performance id is missing', item);
            alert('공연을 확인할 수 없습니다. 다른 항목을 선택해 주세요.');
            return;
          }

          const idNum = Number(item.id);
          const label = item.performanceName ?? String(idNum);

          setSelectedKey(String(idNum));

          setForm({
            performanceId: idNum,
            performance: label,
          });
          navigate(-1);
        }}
      />
    </div>
  );
};

export default CalendarReportPerformancePage;
