import {useNavigate} from 'react-router-dom';
import PageHeader from '@/components/global/PageHeader';
import PerformanceCardList from '@/components/main/PerformanceCardList';
import PerformanceCategoryDropdown from '@/components/main/PerformanceCategoryDropdown';

const PerformanceAllPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex gap-15 flex-col mb-30 px-16'>
      <PageHeader
        title='상영 중인 공연 몰아보기'
        onLeftClick={() => navigate(-1)}
        onRightClick={() => navigate('/')}
        showBottomLine={false}
      />

      <PerformanceCategoryDropdown />

      <PerformanceCardList />
    </div>
  );
};

export default PerformanceAllPage;
