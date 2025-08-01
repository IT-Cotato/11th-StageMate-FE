/**
 * 메인 페이지 - 게시물 리스트 컴포넌트
 * hot / 꿀팁 / 일상 게시물 variant로 구분해서 렌더링
 * 카테고리별 필터링된 게시물 목록을 props로 전달해야 합니다
 */

import PostItem from './PostItem';
import LoadMoreButton from '../common/LoadMoreButton';
import CommunityCategory from '../common/CommunityCategory';
import type {Post} from '@/types/community';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';

type PostListVariant = 'hot' | 'tip' | 'daily';

interface PostListProps {
  icon: React.ReactNode;
  title: string;
  posts: Post[];
  variant: PostListVariant;
  onClick: () => void; // 카테고리별로 이동하는 함수
}

const PostList = ({icon, title, posts, variant, onClick}: PostListProps) => {
  const {goToCommunityCategory} = useCommunityListNavigation();
  const {goToPostDetail} = useCommunityNavigation();

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-row gap-6 items-center'>
        {icon}
        <h1 className='text-xl font-bold'>{title}</h1>
      </div>

      {posts.map((post) => {
        const handleClick = () => goToPostDetail(post.category, post.id);

        {
          /** hot 게시물 */
        }
        if (variant === 'hot') {
          return (
            <div
              key={post.id}
              className='w-full h-48 flex flex-row items-center bg-[#fff] px-9 py-6 gap-10'
              onClick={handleClick}>
              <CommunityCategory category={post.category} />
              <PostItem post={post} />
            </div>
          );
        }
        {
          /** 일상, 꿀팁 게시물 */
        }
        return <PostItem key={post.id} post={post} onPostClick={handleClick} />;
      })}
      <LoadMoreButton
        onClick={onClick ?? (() => goToCommunityCategory(variant))}
      />
    </div>
  );
};

export default PostList;
