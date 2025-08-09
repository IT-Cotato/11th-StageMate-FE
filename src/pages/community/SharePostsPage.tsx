import {useEffect, useMemo, useState} from 'react';
import Pagination from 'react-js-pagination';
import {mockSharePosts} from '@/mocks/mockSharePosts';
import {useNavigate} from 'react-router-dom';
import PostCardItem from '@/components/community/post/PostCardItem';
import CommunityListHeader from '@/components/community/common/CommunityListHeader';

const ITEMS_PER_PAGE = 6;

const SharePostsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [currentPage]);

  const totalItemsCount = mockSharePosts.length;

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return mockSharePosts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex flex-col px-40 gap-40'>
      {/* 상단 */}
      <CommunityListHeader
        title='나눔·거래'
        onBack={() => navigate('/community')}
        onWrite={() => navigate('/community/share/write')}
      />

      {/* 리스트 */}
      <ul className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-y-60 gap-x-24'>
        {currentItems.map((post) => (
          <PostCardItem
            key={post.id}
            title={post.title}
            price={post.price}
            category={post.category}
            isBookmarked={post.isBookmarked}
            placeholderText='나눔·거래 임시 이미지'
            isScrapMagazine={true}
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

export default SharePostsPage;
