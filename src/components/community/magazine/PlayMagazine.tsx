import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import LoadMoreButton from '../common/LoadMoreButton';
import {mockMagazine} from '@/mocks/mockMagazine';
import PostCardItem from '../post/PostCardItem';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';

const PlayMagazine = () => {
  const listWrapperRef = useHorizontalScroll();
  const {goToMagazineList} = useCommunityListNavigation();
  const {goToMagazineDetail} = useCommunityNavigation();

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='font-medium text-4xl'>공연 매거진</h1>
        <LoadMoreButton onClick={() => goToMagazineList()} variant='fixed' />
      </div>
      <ul className='flex flex-row gap-12 overflow-x-auto' ref={listWrapperRef}>
        {mockMagazine.map((post) => (
          <PostCardItem
            key={post.id}
            title={post.title}
            subtitle={post.subtitle}
            category={post.category}
            isBookmarked={post.isBookmarked}
            placeholderText='공연 매거진 임시 이미지'
            onClick={() => goToMagazineDetail(post.id)}
          />
        ))}
      </ul>
    </div>
  );
};
export default PlayMagazine;
