import {useState, useEffect} from 'react';
import Pagination from 'react-js-pagination';
import {getTradePostList, toggleCommunityPostScrap} from '@/api/communityApi';
import type {CommunityTradePostSummary} from '@/types/communityList';
import {useNavigate} from 'react-router-dom';
import PostCardItem from '@/components/community/post/PostCardItem';
import CommunityListHeader from '@/components/community/common/CommunityListHeader';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';

const ITEMS_PER_PAGE = 6;

const SharePostsPage = () => {
  const navigate = useNavigate();
  const {goToShareDetail} = useCommunityNavigation();
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

  const handleScrapClick = async (postId: number) => {
    try {
      await toggleCommunityPostScrap(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? {...post, isScrapped: !post.isScrapped} : post
        )
      );
    } catch (error) {
      console.error('스크랩 처리 실패:', error);
    }
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
      <ul className='flex flex-wrap justify-center gap-y-60 gap-x-20'>
        {loading
          ? Array.from({length: ITEMS_PER_PAGE}).map((_, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <div className='skeleton-shimmer w-full h-[200px] rounded-[10px] mb-2' />
                <div className='skeleton-shimmer h-4 w-3/4 rounded mb-1' />
                <div className='skeleton-shimmer h-3 w-1/2 rounded' />
              </div>
            ))
          : posts.map((post) => (
              <PostCardItem
                key={post.id}
                title={post.title}
                category={post.category}
                displayCategory={post.tradeCategory}
                isScraped={post.isScrapped}
                imageUrl={post.imageUrl}
                placeholderText='나눔·거래 이미지'
                isScrapMagazine={true}
                onClick={() => goToShareDetail(post.id)}
                onScrapClick={() => handleScrapClick(post.id)}
              />
            ))}
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
