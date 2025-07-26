// 리스트에서 특정 카테고리의 게시글만 필터링하여 보여주는 컴포넌트
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import WritePost from '@/assets/nav-icons/write-post.svg?react';
import {useNavigate, useParams} from 'react-router-dom';
import PostListItem from './PostListItem';
import {mockPosts} from '@/mocks/mockPosts';
import {useMemo} from 'react';
import {CATEGORY_MAP} from '@/types/categoryMap';
import type {CategoryKey, CategoryLabel} from '@/types/categoryMap';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';

const FilteredPostList = () => {
  const {category} = useParams<{category?: string}>();
  const navigate = useNavigate();
  const {goToPostDetail} = useCommunityNavigation();

  const categoryLabel: CategoryLabel | null = useMemo(() => {
    if (category && category in CATEGORY_MAP) {
      return CATEGORY_MAP[category as CategoryKey];
    }
    return null;
  }, [category]);

  const filteredPosts = useMemo(() => {
    return categoryLabel
      ? mockPosts.filter((post) => post.category === categoryLabel)
      : [];
  }, [categoryLabel]);

  if (!categoryLabel) {
    return <div className='p-4 font-semibold'>잘못된 경로입니다.</div>;
  }

  return (
    <div>
      {/* 상단바 */}
      <div className='flex justify-between items-center'>
        {/* 왼쪽: 뒤로가기 버튼 + 카테고리명 */}
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

        {/* 오른쪽: 게시글 작성 버튼 */}
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
        {filteredPosts.map((post) => {
          const handleClick = () => goToPostDetail(category as string, post.id);
          return (
            <PostListItem key={post.id} post={post} onClick={handleClick} />
          );
        })}
      </div>
    </div>
  );
};

export default FilteredPostList;
