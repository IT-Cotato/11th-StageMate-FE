import {useState, useEffect} from 'react';
import Diamond from '@/assets/community/share-post-diamond.svg?react';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import PostCardItem from './PostCardItem';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import {getUrlFromCategoryName} from '@/util/categoryMapper';
import LoadMoreButton from '@/components/global/LoadMoreButton';
import {getTradePostList} from '@/api/communityApi';
import type {CommunityTradePostSummary} from '@/types/communityList';

const SharePostList = () => {
  const [posts, setPosts] = useState<CommunityTradePostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const listWrapperRef = useHorizontalScroll();
  const {goToShareList} = useCommunityListNavigation();
  const {goToPostDetail} = useCommunityNavigation();

  const handleClick = (post: CommunityTradePostSummary) => {
    const englishCategory = getUrlFromCategoryName('나눔 · 거래');
    goToPostDetail(englishCategory, post.id);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getTradePostList(1, 5);
        setPosts(data.list);
      } catch (error) {
        console.error('나눔·거래 게시글 조회 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
        {loading
          ? Array.from({length: 5}).map((_, index) => (
              <li key={index} className='flex-shrink-0'>
                <div className='skeleton-shimmer w-[150px] h-[150px] rounded-lg'></div>
                <div className='skeleton-shimmer h-4 w-3/4 mt-2 rounded-lg'></div>
                <div className='skeleton-shimmer h-4 w-1/2 mt-1 rounded-lg'></div>
              </li>
            ))
          : posts.map((post, index) => (
              <PostCardItem
                key={`${post.id}-${index}`}
                title={post.title}
                category={post.category}
                displayCategory={post.tradeCategory}
                isScraped={post.isScrapped}
                imageUrl={post.imageUrl}
                placeholderText='나눔 거래 이미지'
                onClick={() => handleClick(post)}
              />
            ))}
      </ul>
    </div>
  );
};

export default SharePostList;
