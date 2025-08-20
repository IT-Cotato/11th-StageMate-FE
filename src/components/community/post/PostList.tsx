/**
 * 메인 페이지 - 게시물 리스트 컴포넌트
 * hot / 꿀팁 / 일상 게시물 variant로 구분해서 렌더링
 * 카테고리별 필터링된 게시물 목록을 props로 전달해야 합니다
 */
import {useState, useEffect} from 'react';
import PostItem from './PostItem';
import type {Post} from '@/types/community';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import LoadMoreButton from '@/components/global/LoadMoreButton';
import {
  getCommunityHotList,
  getCommunityPostList,
  toggleCommunityPostLike,
} from '@/api/communityApi';
import {useScrapStore} from '@/stores/useScrapStore';
import {
  apiToUiCategory,
  getSlugFromUi,
  type WriteableUiCategory,
} from '@/util/categoryMapper';
import type {ApiPost} from '@/types/community';

type PostListVariant = 'hot' | 'tip' | 'daily';

interface PostListProps {
  icon: React.ReactNode;
  title: string;
  variant: PostListVariant;
}
const PostList = ({icon, title, variant}: PostListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const {goToCommunityCategory} = useCommunityListNavigation();
  const {goToPostDetail} = useCommunityNavigation();
  const {initializeFromServer, isLiked, toggleLike, getCounts, setCounts} = useScrapStore();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response =
          variant === 'hot'
            ? await getCommunityHotList(1, 5)
            : await getCommunityPostList(
                variant === 'daily' ? '일상' : '꿀팁',
                1,
                5
              );

        const mappedPosts: Post[] = response.list.map((p: ApiPost) => ({
          id: p.id,
          title: p.title,
          author: p.author ?? '',
          createdAt: p.createdAt ?? '',
          likeCount: p.likeCount ?? 0,
          commentCount: p.commentCount ?? 0,
          isLiked: p.isLiked ?? false,
          viewCount: p.viewCount ?? 0,
          isScrapped: false,
          bookmarkCount: 0,
          // UI 라벨로 표준화
          category:
            apiToUiCategory[p.category as '일상' | '꿀팁' | '나눔거래'] ?? '',
          uniqueKey: String(p.id),
          // 이미지 표준화: detail(list) 대응
          imgUrls: Array.isArray(p.imageUrls)
            ? p.imageUrls.map((img) => img.url)
            : p.imageUrl && p.imageUrl !== 'basic'
              ? [p.imageUrl]
              : [],
        }));

        setPosts(mappedPosts);
        
        // 전역 상태 초기화
        const stateInitData = mappedPosts.map(post => ({
          id: post.id,
          type: 'community' as const,
          isLiked: post.isLiked,
          isScraped: post.isScrapped || false,
          likeCount: post.likeCount,
          scrapCount: post.bookmarkCount || 0,
          commentCount: post.commentCount,
        }));
        initializeFromServer(stateInitData);
        
      } catch (error) {
        console.error(`${title} 조회 실패`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [variant, title]);

  const handleClick = (post: Post) => () => {
    const slug = getSlugFromUi(post.category as WriteableUiCategory);
    goToPostDetail(slug, post.id);
  };

  const handleLike = (post: Post) => async () => {
    const currentCounts = getCounts(post.id, 'community');
    const isCurrentlyLiked = isLiked(post.id, 'community');
    
    // 즉시 전역 상태 업데이트
    toggleLike(post.id, 'community');
    setCounts(post.id, 'community', {
      ...currentCounts,
      likeCount: isCurrentlyLiked ? currentCounts.likeCount - 1 : currentCounts.likeCount + 1,
    });
    
    // 로컬 상태도 동기화
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id
          ? {
              ...p,
              isLiked: !isCurrentlyLiked,
              likeCount: isCurrentlyLiked ? p.likeCount - 1 : p.likeCount + 1,
            }
          : p
      )
    );

    try {
      await toggleCommunityPostLike(post.id);
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      // 실패시 원복
      toggleLike(post.id, 'community');
      setCounts(post.id, 'community', currentCounts);
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                isLiked: isCurrentlyLiked,
                likeCount: isCurrentlyLiked ? p.likeCount + 1 : p.likeCount - 1,
              }
            : p
        )
      );
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className='flex flex-col gap-15'>
        <div className='flex flex-row justify-between items-end'>
          <div className=' flex flex-row gap-10 items-center'>
            {icon}
            <h1 className='text-xl font-bold'>{title}</h1>
          </div>
          <LoadMoreButton onClick={() => goToCommunityCategory(variant)} />
        </div>
        <div className='bg-[#fff] rounded-[20px] w-full p-5 flex flex-col gap-4'>
          {Array.from({length: 5}).map((_, index) => (
            <div
              key={index}
              className='skeleton-shimmer h-[55px] w-full rounded-lg'></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-15'>
      <div className='flex flex-row justify-between items-end'>
        <div className=' flex flex-row gap-10 items-center'>
          {icon}
          <h1 className='text-xl font-bold'>{title}</h1>
        </div>
        <LoadMoreButton onClick={() => goToCommunityCategory(variant)} />
      </div>

      {variant === 'hot' ? (
        <div className='bg-[#fff] rounded-[20px] w-full px-20 py-7 flex flex-col gap-4 border border-primary-4'>
          {posts.map((post) => (
            <div
              key={post.uniqueKey}
              className='flex flex-row gap-10 pb-4 cursor-pointer items-center'
              onClick={handleClick(post)}>
              {/* 카테고리명 + 게시판 표시 */}
              <h1 className='font-semibold text-[18px] whitespace-nowrap shrink-0'>
                {post.category !== '나눔 · 거래'
                  ? `${post.category}게시판`
                  : post.category}
              </h1>
              {/* 게시물 내용 */}
              <PostItem
                post={post}
                variant='hot'
                onPostClick={handleClick(post)}
                onLikeClick={handleLike(post)}
              />
            </div>
          ))}
        </div>
      ) : (
        /** 일상, 꿀팁 게시물 */
        <div className='bg-[#fff] rounded-[20px] w-full p-5 flex flex-col gap-4'>
          {posts.map((post, idx) => (
            <div
              key={post.uniqueKey}
              className={`pb-4 ${
                idx !== posts.length - 1 ? 'border-b border-primary-5' : ''
              }`}>
              <PostItem
                post={post}
                onPostClick={handleClick(post)}
                onLikeClick={handleLike(post)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
