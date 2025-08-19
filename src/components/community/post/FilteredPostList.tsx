import {useState, useMemo, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import Pagination from 'react-js-pagination';
import PostListItem from './PostListItem';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import WritePost from '@/assets/nav-icons/write-post.svg?react';

import {
  getCategoryNameFromUrl,
  getSlugFromUi,
  apiToUiCategory,
  type UiCategory,
  type WriteableUiCategory,
} from '@/util/categoryMapper';

import {getCommunityPostList, getCommunityHotList} from '@/api/communityApi';
import type {ApiPost, Post} from '@/types/community';

const ITEMS_PER_PAGE = 10;

const FilteredPostList = () => {
  const {category} = useParams<{category?: string}>();
  const navigate = useNavigate();
  const {goToPostDetail} = useCommunityNavigation();
  const [currentPage, setCurrentPage] = useState(1);

  const categoryLabel: UiCategory | null = useMemo(() => {
    if (!category) return null;
    const ui = getCategoryNameFromUrl(category);
    return ui ?? null;
  }, [category]);

  const {
    data: postsData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['communityPosts', category, currentPage],
    queryFn: async () => {
      if (!categoryLabel) return null;
      const isHot = category === 'hot';

      const data = isHot
        ? await getCommunityHotList(currentPage, ITEMS_PER_PAGE)
        : await getCommunityPostList(
            categoryLabel,
            currentPage,
            ITEMS_PER_PAGE
          );

      const mappedPosts: Post[] = data.list.map((p: ApiPost) => ({
        id: p.id,
        category:
          apiToUiCategory[p.category as '일상' | '꿀팁' | '나눔거래'] ?? '',
        title: p.title,
        likeCount: p.likeCount ?? 0,
        commentCount: p.commentCount ?? 0,
        isLiked: p.isLiked ?? false,
        viewCount: p.viewCount ?? 0,
        nickname: p.author ?? '',
        date: p.createdAt ?? '',
        isScrapped: false,
        bookmarkCount: 0,
        uniqueKey: String(p.id),
        imgUrls: Array.isArray(p.imageUrls)
          ? p.imageUrls.map((img) => img.url)
          : p.imageUrl && p.imageUrl !== 'basic'
            ? [p.imageUrl]
            : [],
      }));

      return {posts: mappedPosts, totalElements: data.totalElements};
    },
    enabled: !!categoryLabel,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess) window.scrollTo({top: 0, behavior: 'smooth'});
  }, [isSuccess, currentPage]);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!categoryLabel)
    return <div className='p-4 font-semibold'>잘못된 경로입니다.</div>;

  const handleWrite = () => {
    // HOT은 작성 불가 → 일단 '일상'으로 이동하거나 disable 처리
    const targetUi: WriteableUiCategory =
      categoryLabel === 'HOT' ? '일상' : (categoryLabel as WriteableUiCategory);
    const slug = getSlugFromUi(targetUi);
    navigate(`/community/${slug}/write`);
  };

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
          onClick={handleWrite}>
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
              const slug = getSlugFromUi(
                (post.category === 'HOT'
                  ? '일상'
                  : post.category) as WriteableUiCategory
              );
              const handleClick = () => goToPostDetail(slug, post.id);

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
