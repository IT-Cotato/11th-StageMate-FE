/**
 * 메인 페이지 - 나눔 · 거래 리스트 컴포넌트
 */

import Diamond from '@/assets/community/share-post-diamond.svg?react';
import {mockSharePosts} from '@/mocks/mockSharePosts';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import PostCardItem from './PostCardItem';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';
import LoadMoreButton from '@/components/global/LoadMoreButton';

const SharePostList = () => {
  const listWrapperRef = useHorizontalScroll();
  const {goToShareList} = useCommunityListNavigation();
  return (
    <div className='flex flex-col gap-15'>
      {/** title */}
      <div className='flex flex-row justify-between items-end'>
        <div className='flex flex-row text-xl font-bold items-end gap-10'>
          <Diamond />
          <h1>나눔 · 거래 게시판</h1>
        </div>
        {/** 더보기 버튼 */}
        <LoadMoreButton onClick={goToShareList} />
      </div>

      {/** 게시물 리스트 렌더링 */}
      <ul className='flex flex-row gap-12 overflow-x-auto' ref={listWrapperRef}>
        {mockSharePosts.map((post) => (
          <PostCardItem
            key={post.id}
            title={post.title}
            price={post.price}
            category={post.category}
            isBookmarked={post.isBookmarked}
            placeholderText='나눔 거래 임시 이미지'
          />
        ))}
      </ul>
    </div>
  );
};

export default SharePostList;
