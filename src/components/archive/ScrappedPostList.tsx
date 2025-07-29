import {useEffect, useState} from 'react';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import {useNavigate} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import {mockPosts} from '@/mocks/mockPosts';
import PostListItem from '../community/post/PostListItem';
const ITEMS_PER_PAGE = 9;

const ScrappedPostList = () => {
  const navigate = useNavigate();
  const scrappedPost = mockPosts.filter((post) => post.isScrapped === true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItemsCount = scrappedPost.length;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = scrappedPost.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);
  return (
    <div className='flex flex-col px-20 gap-40'>
      {/* 상단 */}
      <div className='flex flex-row justify-between items-center mb-6'>
        <ChevronLeft
          className='w-50 h-50 cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <span className='text-xl font-extrabold'>스크랩한 글 모아보기</span>
      </div>

      {/* 리스트 */}
      <ul className='flex flex-col gap-10'>
        {currentItems.map((post, idx) => (
          <PostListItem key={idx} post={post} />
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
export default ScrappedPostList;
