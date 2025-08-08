import {useNavigate} from 'react-router-dom';
import PageHeader from '@/components/global/PageHeader';
import PerformanceCardList from '@/components/main/PerformanceCardList';
import PerformanceCategoryDropdown from '@/components/main/PerformanceCategoryDropdown';
import {useState} from 'react';

const PerformanceAllPage = () => {
  const navigate = useNavigate();
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    '전체' | '뮤지컬' | '연극'
  >('전체');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  return (
    <div className='flex gap-15 flex-col mb-30'>
      <PageHeader
        title='상영 중인 공연 몰아보기'
        onLeftClick={() => navigate(-1)}
        onRightClick={() => navigate('/')}
        showBottomLine={false}
      />

      <PerformanceCategoryDropdown
        selectedMainCategory={selectedMainCategory}
        setSelectedMainCategory={setSelectedMainCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />

      <PerformanceCardList mode='external' />
    </div>
  );
};

export default PerformanceAllPage;
