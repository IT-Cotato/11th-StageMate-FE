import {useOutletContext} from 'react-router-dom';
import {useEffect} from 'react';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useNavigate} from 'react-router-dom';
import PerformanceCardList from '@/components/main/PerformanceCardList';
import PerformanceCategoryDropdown from '@/components/main/PerformanceCategoryDropdown';
import {useState} from 'react';

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

  const [selectedMainCategory, setSelectedMainCategory] = useState<
    '전체' | '뮤지컬' | '연극'
  >('전체');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  return (
    <div className='flex gap-15 flex-col mb-30'>
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
