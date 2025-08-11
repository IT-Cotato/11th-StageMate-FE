import {useEffect} from 'react';
import Pagination from 'react-js-pagination';
import PerformanceCard from '@/components/main/PerformanceCard';
import {usePerformanceStore} from '@/stores/usePerformanceStore';
import '@/styles/skeleton.css';
const ITEMS_PER_PAGE = 9;

const PerformanceCardList = () => {
  const {
    performances,
    totalItemsCount,
    loading,
    currentPage,
    setCurrentPage,
    fetchPerformances,
  } = usePerformanceStore();

  useEffect(() => {
    fetchPerformances();
  }, [fetchPerformances]);

  // todo: 로딩 표시, 공연 없음 예외 처리
  // 임시로 스켈레톤 표시
  if (loading) {
    return (
      <div className='grid grid-cols-3 gap-x-10 sm:gap-y-20 gap-y-15 px-4'>
        {Array(ITEMS_PER_PAGE)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className='sm:w-180 w-110 sm:h-[314px] flex flex-col gap-2 text-center p-2 bg-white rounded-lg'>
              {/* 이미지 자리 shimmer */}
              <div className='skeleton-shimmer rounded-[20px] h-[200px] w-full mb-2' />

              {/* 제목 shimmer */}
              <div className='skeleton-shimmer h-20 w-4/5 mx-auto mb-1 rounded' />

              {/* 날짜 shimmer */}
              <div className='skeleton-shimmer h-16 w-3/5 mx-auto mb-1 rounded' />

              {/* 극장명 shimmer */}
              <div className='skeleton-shimmer h-16 w-1/2 mx-auto rounded' />
            </div>
          ))}
      </div>
    );
  }
  if (!performances || performances.length === 0)
    return (
      <div className='flex items-center justify-center py-20 text-red-500 text-lg font-semibold'>
        공연 목록을 불러오지 못했습니다.
      </div>
    );

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='grid grid-cols-3 gap-x-10 sm:gap-y-20 gap-y-15 px-4'>
        {performances.map((performance) => (
          <PerformanceCard key={performance.url} {...performance} />
        ))}
      </div>

      <div className='flex justify-center mt-6'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={ITEMS_PER_PAGE}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={10}
          onChange={(page) => setCurrentPage(page)}
          innerClass='flex gap-6'
          itemClass='px-5 py-1 text-sm'
          activeClass='font-bold'
          prevPageText='<'
          nextPageText='>'
          firstPageText='<<'
          lastPageText='>>'
        />
      </div>
    </div>
  );
};

export default PerformanceCardList;
