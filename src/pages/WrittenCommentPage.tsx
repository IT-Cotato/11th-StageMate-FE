import PostListItem from '@/components/community/post/PostListItem';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {mockPosts} from '@/mocks/mockPosts';
import {useState, useEffect} from 'react';
import Pagination from 'react-js-pagination';
const ITEMS_PER_PAGE = 9;

const WrittenCommentPage = () => {
  const scrappedPost = mockPosts.filter((post) => post.isScrapped === true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItemsCount = scrappedPost.length;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = scrappedPost.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex flex-col gap-40'>
      {/* 상단 */}
      <BackButtonTitleHeader title='댓글 단 글 모아보기' between />

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

export default WrittenCommentPage;
