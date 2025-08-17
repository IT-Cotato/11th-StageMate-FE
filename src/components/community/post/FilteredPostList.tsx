import {useState, useEffect, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import PostListItem from './PostListItem';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import WritePost from '@/assets/nav-icons/write-post.svg?react';
import {CATEGORY_MAP} from '@/types/categoryMap';
import type {CategoryKey, CategoryLabel} from '@/types/categoryMap';
import {getCommunityPostList, getCommunityHotList} from '@/api/community';
import type {Post} from '@/types/community';

const ITEMS_PER_PAGE = 10;

const FilteredPostList = () => {
  const {category} = useParams<{category?: string}>();
  const navigate = useNavigate();
  const {goToPostDetail} = useCommunityNavigation();

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const categoryLabel: CategoryLabel | null = useMemo(() => {
    if (category && category in CATEGORY_MAP) {
      return CATEGORY_MAP[category as CategoryKey];
    }
    return null;
  }, [category]);

  useEffect(() => {
    if (!categoryLabel) {
      setLoading(false);
      return;
    }
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data =
          category === 'hot'
            ? await getCommunityHotList(currentPage, ITEMS_PER_PAGE)
            : await getCommunityPostList(categoryLabel, currentPage, ITEMS_PER_PAGE);

        const mappedPosts: Post[] = data.list.map((p) => ({
          ...p,
          nickname: p.author,
          date: p.createdAt,
          isScrapped: false,
          bookmarkCount: 0,
        }));
        setPosts(mappedPosts);
        setTotalItemsCount(data.totalElements);
      } catch (error) {
        console.error(`${categoryLabel} 게시글 조회 실패`, error);
      } finally {
        setLoading(false);
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    };
    fetchPosts();
  }, [category, categoryLabel, currentPage]);

  if (!categoryLabel) {
    return <div className='p-4 font-semibold'>잘못된 경로입니다.</div>;
  }

  return (
    <div>
      {/* 상단바 */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center cursor-pointer'>
          <button
            className='flex items-center justify-center'
            onClick={() => navigate('/community')}>
            <div className='w-[50px] h-[50px] cursor-pointer'>
              <ChevronLeft className='w-full h-full' />
            </div>
          </button>
          <span className='font-bold text-xl leading-[140%]'>
            {categoryLabel}
          </span>
        </div>
        <button
          className='flex items-center gap-[8px] cursor-pointer'
          onClick={() => navigate(`/community/${category}/write`)}>
          <div className='w-[19px] h-[19px]'>
            <WritePost className='w-full h-full' />
          </div>
          <span className='font-bold text-xl leading-[140%]'>게시글 작성</span>
        </button>
      </div>

      {/* 게시글 리스트 */}
      <div className='flex flex-col mt-[22px] gap-[19px]'>
        {loading ? (
          Array.from({length: ITEMS_PER_PAGE}).map((_, index) => (
            <div key={index} className='skeleton-shimmer h-[88px] w-full rounded-lg'></div>
          ))
        ) : (
          posts.map((post) => {
            const handleClick = () => goToPostDetail(category as string, post.id);
            return (
              <PostListItem key={post.id} post={post} onClick={handleClick} />
            );
          })
        )}
      </div>

      {/* 페이지네이션 */}
      {!loading && posts.length > 0 && (
        <div className='flex justify-center mt-20'>
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

export default FilteredPostList;
