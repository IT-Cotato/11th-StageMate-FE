import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import Picture from '@/assets/community/magazine-picture.svg?react';
import PostCardItem from '../post/PostCardItem';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import LoadMoreButton from '@/components/global/LoadMoreButton';
import {useLatestMagazines} from '@/hooks/useMagazine';
import type {Magazine} from '@/types/community';

const PlayMagazine = () => {
  const listWrapperRef = useHorizontalScroll();
  const {goToMagazineList} = useCommunityListNavigation();
  const {goToMagazineDetail} = useCommunityNavigation();
  const {data, isLoading, isError} = useLatestMagazines(4);
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했어요.</div>;
  }
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
        {data?.map((magazine: Magazine) => (
          <PostCardItem
            key={magazine.id}
            title={magazine.title}
            subTitle={magazine.subTitle}
            category={magazine.category}
            isScraped={magazine.isScraped}
            imageUrl={magazine.imageUrl}
            placeholderText={magazine.title}
            isMagazine={true}
            onClick={() => goToMagazineDetail(magazine.id)}
          />
        ))}
      </ul>
    </div>
  );
};
export default PlayMagazine;
