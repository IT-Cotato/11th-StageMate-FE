import {useOutletContext, useNavigate} from 'react-router-dom';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useEffect, useState} from 'react';
import PerformanceCardList from '@/components/main/PerformanceCardList';
import {useReportFormStore} from '@/stores/useReportFormStore';

type PerformanceItemMinimal = {
  // TODO(BE-ID): BE가 내부 id를 내려주면 아래 두 필드 중 하나를 **필수(number)** 로 고정
  id?: number | string; // ← 내부 id가 이 키로 온다면 number로 변경 예정
  performanceId?: number | string; // ← 내부 id가 이 키로 온다면 number로 변경 예정

  performanceName?: string;
  title?: string;
  url?: string; // 외부 예매처 URL
};

// (임시) url에서 숫자 추출 — BE가 id 내려주면 삭제 예정
const extractIdFromUrl = (url: string | undefined): number | null => {
  if (!url) return null;
  const match = url.match(/(\d+)/);
  return match ? Number(match[0]) : null;
};

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
        onSelect={(item: PerformanceItemMinimal) => {
          // TODO(BE-ID): BE가 내부 id를 내려주면
          // 1. 아래 candidates/추출 로직 제거
          // 2. const idNum = Number(item.id ?? item.performanceId); 로 단순화
          let idNum: number | null = null;

          if (item.id != null || item.performanceId != null) {
            idNum = Number(item.id ?? item.performanceId);
          }

          // (임시 fallback) url에서 숫자 추출 — BE가 id 내려주면 제거 예정
          if (!idNum || Number.isNaN(idNum)) {
            idNum = extractIdFromUrl(item.url);
          }

          if (!idNum || Number.isNaN(idNum)) {
            console.error('[select] invalid performance id', item);
            alert('공연 ID를 확인할 수 없습니다. 다른 항목을 선택해 주세요.');
            return;
          }

          const label = item.performanceName ?? item.title ?? String(idNum);

          // TODO: selectedKey를 id 기반 유지할지 label로 할지 컴포넌트 구현에 맞춰 결정
          setSelectedKey(String(idNum));

          setForm({
            performanceId: idNum, //API로 보낼 내부 id
            performance: label, // 표시용 라벨
          });

          navigate(-1);
        }}
      />
    </div>
  );
};

export default CalendarReportPerformancePage;
