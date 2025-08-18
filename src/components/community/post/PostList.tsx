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
import {getCommunityHotList, getCommunityPostList} from '@/api/community';
import {getUrlFromCategoryName} from '@/util/categoryMapper';

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

        const mappedPosts: Post[] = response.list.map((p) => ({
          ...p,
          nickname: p.author,
          date: p.createdAt,
          isScrapped: false,
          bookmarkCount: 0,
          likeCount: p.likeCount || 0,
          commentCount: p.commentCount || 0,
          isLiked: p.isLiked || false,
          viewCount: p.viewCount || 0,
          category: p.category || '',
          id: p.id,
          title: p.title,
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error(`${title} 조회 실패`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [variant, title]);

  const handleClick = (post: Post) => () => {
    const englishCategory = getUrlFromCategoryName(post.category);
    goToPostDetail(englishCategory, post.id);
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
              key={post.id}
              className='flex flex-row gap-10 pb-4 cursor-pointer items-center'
              onClick={handleClick(post)}>
              {/* 카테고리명 + 게시판 표시 */}
              <h1 className='font-semibold text-[18px] whitespace-nowrap shrink-0'>
                {post.category !== '나눔 · 거래'
                  ? `${post.category}게시판`
                  : post.category}
              </h1>
              {/* 게시물 내용 */}
              <PostItem post={post} variant='hot' />
            </div>
          ))}
        </div>
      ) : (
        /** 일상, 꿀팁 게시물 */
        <div className='bg-[#fff] rounded-[20px] w-full p-5 flex flex-col gap-4'>
          {posts.map((post, idx) => (
            <div
              key={post.id}
              className={`pb-4 ${
                idx !== posts.length - 1 ? 'border-b border-primary-5' : ''
              }`}>
              <PostItem post={post} onPostClick={handleClick(post)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
