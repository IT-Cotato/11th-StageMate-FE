import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import Picture from '@/assets/community/magazine-picture.svg?react';
import {mockMagazine} from '@/mocks/mockMagazine';
import PostCardItem from '../post/PostCardItem';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import LoadMoreButton from '@/components/global/LoadMoreButton';

const PlayMagazine = () => {
  const listWrapperRef = useHorizontalScroll();
  const {goToMagazineList} = useCommunityListNavigation();
  const {goToMagazineDetail} = useCommunityNavigation();

  return (
    <div className='flex flex-col gap-15'>
      <div className='flex flex-row items-end justify-between'>
        <div className='flex flex-row gap-10 items-center'>
          <Picture />
          <h1 className='text-xl font-bold'>공연 매거진</h1>
        </div>
        <LoadMoreButton onClick={() => goToMagazineList()} />
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
