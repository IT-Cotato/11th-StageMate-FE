import {mockMagazine} from '@/mocks/mockMagazine';
import PostCardItem from '../community/post/PostCardItem';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';

const ScrappedMagazineList = () => {
  const bookmarkedMagazines = mockMagazine.filter(
    (magazine) => magazine.isBookmarked
  );
  const listWrapperRef = useHorizontalScroll();
  return (
    <ul
      className='flex flex-row sm:gap-12 gap-6 overflow-x-auto'
      ref={listWrapperRef}>
      {bookmarkedMagazines.map((post) => (
        <PostCardItem
          title={post.title}
          subtitle={post.subtitle}
          category={post.category}
          isBookmarked={post.isBookmarked}
          placeholderText='공연 매거진 임시 이미지'
        />
      ))}
    </ul>
  );
};

export default ScrappedMagazineList;
