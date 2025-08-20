import {useState} from 'react';
import Pagination from 'react-js-pagination';

import PostListItem from '@/components/community/post/PostListItem';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {useUserCommunities} from '@/hooks/useUserContents';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {useNavigate} from 'react-router-dom';
const ITEMS_PER_PAGE = 9;

const ScrappedPostPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const {data, isLoading, isError} = useUserCommunities(
    currentPage,
    ITEMS_PER_PAGE
  );
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className='text-sm text-red justify-center'>
        스크랩한 글을 불러오지 못했습니다.
      </div>
    );

  const posts = data?.data.list ?? [];
  const totalItemsCount = data?.data.totalElements ?? 0;
  return (
    <div className='flex flex-col gap-40'>
      {/* 상단 */}
      <BackButtonTitleHeader title='스크랩한 글 모아보기' between />

      {/* 리스트 */}
      {posts.length > 0 ? (
        <ul className='flex flex-col gap-10'>
          {posts.map((post) => (
            <PostListItem
              key={post.id}
              post={post}
              onClick={() => navigate(`/community/${post.category}/${post.id}`)}
            />
          ))}
        </ul>
      ) : (
        <div className='text-gray-500 text-sm text-center'>
          스크랩한 글이 없습니다.
        </div>
      )}

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
export default ScrappedPostPage;
