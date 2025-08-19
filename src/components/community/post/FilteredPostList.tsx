import {useState, useMemo, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import Pagination from 'react-js-pagination';
import PostListItem from './PostListItem';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import WritePost from '@/assets/nav-icons/write-post.svg?react';
import {CATEGORY_MAP} from '@/types/categoryMap';
import type {CategoryKey, CategoryLabel} from '@/types/categoryMap';
import {getCommunityPostList, getCommunityHotList} from '@/api/communityApi';
import type {Post} from '@/types/community';

const ITEMS_PER_PAGE = 10;

const FilteredPostList = () => {
  const {category} = useParams<{category?: string}>();
  const navigate = useNavigate();
  const {goToPostDetail} = useCommunityNavigation();
  const [currentPage, setCurrentPage] = useState(1);

  const categoryLabel: CategoryLabel | null = useMemo(() => {
    if (category && category in CATEGORY_MAP) {
      return CATEGORY_MAP[category as CategoryKey];
    }
    return null;
  }, [category]);

  const {
    data: postsData,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['communityPosts', category, currentPage],
    queryFn: async () => {
      if (!categoryLabel) return null;

      try {
        const data =
          category === 'hot'
            ? await getCommunityHotList(currentPage, ITEMS_PER_PAGE)
            : await getCommunityPostList(
                categoryLabel,
                currentPage,
                ITEMS_PER_PAGE
              );

        const mappedPosts: Post[] = data.list.map((p) => ({
          ...p,
          nickname: p.author,
          date: p.createdAt,
          isScrapped: false,
          bookmarkCount: 0,
        }));

        return {
          posts: mappedPosts,
          totalElements: data.totalElements,
        };
      } catch (error) {
        console.error(`${categoryLabel} 게시글 조회 실패`, error);
        throw error; // 에러를 다시 throw해야 React Query가 인식함
      }
    },
    enabled: !!categoryLabel, // categoryLabel이 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 간주
    gcTime: 10 * 60 * 1000, // cacheTime → gcTime으로 변경 (v5)
  });

  // 데이터 로드 성공 시 스크롤을 맨 위로 (useEffect로 분리)
  useEffect(() => {
    if (isSuccess) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, [isSuccess, currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!categoryLabel) {
    return <div className='p-4 font-semibold'>잘못된 경로입니다.</div>;
  }

  if (error) {
    return (
      <div className='p-4 text-center'>
        <p className='text-red-500 mb-4'>게시글을 불러오는데 실패했습니다.</p>
        <button
          onClick={() => window.location.reload()}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className='px-16'>
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
        {isLoading
          ? Array.from({length: ITEMS_PER_PAGE}).map((_, index) => (
              <div
                key={index}
                className='skeleton-shimmer h-[88px] w-full rounded-lg'
              />
            ))
          : postsData?.posts.map((post, index) => {
              const handleClick = () =>
                goToPostDetail(category as string, post.id);
              return (
                <PostListItem
                  key={`${post.id}-${index}`}
                  post={post}
                  onClick={handleClick}
                />
              );
            })}
      </div>

      {/* 페이지네이션 */}
      {!isLoading && postsData && postsData.posts.length > 0 && (
        <div className='flex justify-center mt-20'>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={ITEMS_PER_PAGE}
            totalItemsCount={postsData.totalElements}
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
      )}
    </div>
  );
};

export default FilteredPostList;
