import {useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PostListItem from './PostListItem';
import {mockPosts} from '@/mocks/mockPosts';
import {
  getCategoryNameFromUrl,
  getUrlFromCategoryName,
} from '@/util/categoryMapper';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import CommunityListHeader from '@/components/community/common/CommunityListHeader'; // ← 추가

const FilteredPostList = () => {
  const {category} = useParams<{category?: string}>();
  const navigate = useNavigate();
  const {goToPostDetail} = useCommunityNavigation();

  const categoryLabel = category ? getCategoryNameFromUrl(category) : null;

  const filteredPosts = useMemo(() => {
    return categoryLabel
      ? mockPosts.filter((post) => post.category === categoryLabel)
      : [];
  }, [categoryLabel]);

  if (!categoryLabel) {
    return <div className='p-4 font-semibold'>잘못된 경로입니다.</div>;
  }

  const categoryUrl = getUrlFromCategoryName(categoryLabel);

  return (
    <div className='px-16'>
      <CommunityListHeader
        title={categoryLabel}
        onBack={() => navigate('/community')}
        onWrite={() => navigate(`/community/${categoryUrl}/write`)}
      />

      {/* 게시글 리스트 */}
      <div className='flex flex-col mt-[22px] gap-[19px]'>
        {filteredPosts.map((post) => {
          const handleClick = () => goToPostDetail(categoryUrl, post.id);
          return (
            <PostListItem key={post.id} post={post} onClick={handleClick} />
          );
        })}
      </div>
    </div>
  );
};

export default FilteredPostList;
