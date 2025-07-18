import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import LoadMoreButton from '../common/LoadMoreButton';
import {mockMagazine} from '@/mocks/mockMagazine';
import PostCardItem from '../post/PostCardItem';

const PlayMagazine = () => {
  const listWrapperRef = useHorizontalScroll();
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='font-medium text-4xl'>공연 매거진</h1>
        <LoadMoreButton variant='fixed' />
      </div>
      <ul className='flex flex-row gap-12 overflow-x-auto' ref={listWrapperRef}>
        {mockMagazine.map((post) => (
          <PostCardItem
            title={post.title}
            subtitle={post.subtitle}
            category={post.category}
            isBookmarked={post.isBookmarked}
            placeholderText='공연 매거진 임시 이미지'
          />
        ))}
      </ul>
    </div>
  );
};
export default PlayMagazine;
