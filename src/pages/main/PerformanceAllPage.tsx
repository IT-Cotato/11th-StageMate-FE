import {useOutletContext} from 'react-router-dom';
import {useEffect} from 'react';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useNavigate} from 'react-router-dom';
import PerformanceCardList from '@/components/main/PerformanceCardList';
import PerformanceCategoryDropdown from '@/components/main/PerformanceCategoryDropdown';

const PerformanceAllPage = () => {
  const {setHeaderProps} = useOutletContext<{
    setHeaderProps: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
  }>();

  const navigate = useNavigate();

  useEffect(() => {
    setHeaderProps({
      title: '상영 중인 공연 몰아보기',
      showHomeIcon: false,
      showBottomLine: false,
      onLeftClick: () => {
        navigate(-1);
      },
    });
  }, [setHeaderProps, navigate]);

  return (
    <div className='flex gap-15 flex-col mb-30'>
      <PerformanceCategoryDropdown />
      <PerformanceCardList mode='external' />
    </div>
  );
};

export default PerformanceAllPage;
