import {useEffect, useState} from 'react';
import Pagination from 'react-js-pagination';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import {mockMagazine} from '@/mocks/mockMagazine';
import {useNavigate} from 'react-router-dom';
import PostCardItem from '../community/post/PostCardItem';

const ITEMS_PER_PAGE = 6;

const ScrappedMagazineList = () => {
  const navigate = useNavigate();
  const scrappedMagazine = mockMagazine.filter(
    (magazine) => magazine.isBookmarked
  );

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItemsCount = scrappedMagazine.length;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = scrappedMagazine.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex flex-col px-20 gap-40'>
      {/* 상단 */}
      <div className='flex flex-row justify-between items-center mb-6'>
        <ChevronLeft
          className='w-50 h-50 cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <span className='text-xl font-extrabold'>스크랩한 매거진 모아보기</span>
      </div>

      {/* 리스트 */}
      <ul className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-y-60 gap-x-24'>
        {currentItems.map((magazine, idx) => (
          <PostCardItem
            key={idx}
            title={magazine.title}
            subtitle={magazine.subtitle}
            category={magazine.category}
            isBookmarked={magazine.isBookmarked}
            isScrapMagazine={true}
            placeholderText='매거진 임시 이미지'
            variant='compact'
          />
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className='flex justify-center'>
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

export default ScrappedMagazineList;
