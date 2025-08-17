import {useState, useEffect} from 'react';
import Pagination from 'react-js-pagination';
import {getTradePostList} from '@/api/community';
import type {CommunityTradePostSummary} from '@/types/communityList';
import {useNavigate} from 'react-router-dom';
import PostCardItem from '@/components/community/post/PostCardItem';
import CommunityListHeader from '@/components/community/common/CommunityListHeader';

const ITEMS_PER_PAGE = 6;

const SharePostsPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<CommunityTradePostSummary[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getTradePostList(currentPage, ITEMS_PER_PAGE);
        setPosts(data.list);
        setTotalItemsCount(data.totalElements);
      } catch (error) {
        console.error('나눔·거래 게시글 조회 실패', error);
      } finally {
        setLoading(false);
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    };
    fetchPosts();
  }, [currentPage]);

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
        {loading ? (
          <div className='w-100 h-100 border-4 border-gray-300 border-t-transparent rounded-full animate-spin' />
        ) : (
          posts.map((post) => (
            <PostCardItem
              key={post.id}
              title={post.title}
              category={post.category}
              displayCategory={post.tradeCategory}
              isBookmarked={false}
              imageUrl={post.imageUrl}
              placeholderText='나눔·거래 이미지'
              isScrapMagazine={true}
            />
          ))
        )}
      </ul>

      {/* 페이지네이션 */}
      {!loading && (
        <div className='flex justify-center'>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={ITEMS_PER_PAGE}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            onChange={setCurrentPage}
            innerClass='flex gap-6'
            itemClass='px-5 py-1 text-sm'
            activeClass='font-bold'
            prevPageText='<'
            nextPageText='>'
            firstPageText='<<'
            lastPageText='>>'
          />
        </div>
      )}
    </div>
  );
};

export default SharePostsPage;
