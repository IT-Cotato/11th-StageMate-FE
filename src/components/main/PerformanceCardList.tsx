import {useState} from 'react';
import Pagination from 'react-js-pagination';
import PerformanceCard from '@/components/main/PerformanceCard';
import {mockPerformance} from '@/mocks/mockPerformance';

const ITEMS_PER_PAGE = 9;

const PerformanceCardList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItemsCount = mockPerformance.length;

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;

  const currentItems = mockPerformance.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='grid grid-cols-3 gap-x-10 gap-y-20 px-4'>
        {currentItems.map((performance, index) => (
          <PerformanceCard key={index} {...performance} />
        ))}
      </div>

      <div className='flex justify-center mt-6'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={ITEMS_PER_PAGE}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
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
