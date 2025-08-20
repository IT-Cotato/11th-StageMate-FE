import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import PostCardItem from '../community/post/PostCardItem';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import type {Magazine} from '@/types/community';

interface ScrappedMagazineProps {
  magazines: Magazine[];
}

const ScrappedMagazine = ({magazines}: ScrappedMagazineProps) => {
  const listWrapperRef = useHorizontalScroll();
  const {goToMagazineDetail} = useCommunityNavigation();
  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-row justify-between items-end'></div>

      <ul
        className='px-15 flex flex-row overflow-x-auto gap-17'
        ref={listWrapperRef}>
        {magazines.map((post) => (
          <PostCardItem
            key={post.id}
            title={post.title}
            subTitle={post.subTitle}
            category={post.category}
            isScraped={post.isScraped}
            imageUrl={post.imageUrl}
            isScrapMagazine={true}
            placeholderText={post.title}
            onClick={() => goToMagazineDetail(post.id)}
          />
        ))}
      </ul>
    </div>
  );
};
export default ScrappedMagazine;
