import {useEffect, useState} from 'react';
import Pagination from 'react-js-pagination';
import {mockMagazine} from '@/mocks/mockMagazine';
import PostCardItem from '@/components/community/post/PostCardItem';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';

const ITEMS_PER_PAGE = 6;

const ScrappedMagazinePage = () => {
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
    <div className='flex flex-col gap-40'>
      {/* 상단 */}
      <BackButtonTitleHeader title='스크랩한 매거진 모아보기' between />

      {/* 리스트 */}
      <ul className='flex flex-wrap justify-center gap-y-60 gap-x-24'>
        {currentItems.map((magazine, idx) => (
          <PostCardItem
            key={idx}
            title={magazine.title}
            subtitle={magazine.subtitle}
            category={magazine.category}
            isBookmarked={magazine.isBookmarked}
            isScrapMagazine={true}
            placeholderText='매거진 임시 이미지'
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

export default ScrappedMagazinePage;
