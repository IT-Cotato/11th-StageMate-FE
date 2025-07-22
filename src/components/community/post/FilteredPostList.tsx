// 리스트에서 특정 카테고리의 게시글만 필터링하여 보여주는 컴포넌트
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import WritePost from '@/assets/nav-icons/write-post.svg?react';
import {useNavigate, useParams} from 'react-router-dom';
import PostListItem from './PostListItem';
import {mockPosts} from '@/mocks/mockPosts';
import {useMemo} from 'react';

const CATEGORY_MAP = {
  tip: '꿀팁',
  daily: '일상',
  share: '나눔 · 거래',
  hot: 'HOT',
} as const;

const FilteredPostList = () => {
  const {category} = useParams<{category?: keyof typeof CATEGORY_MAP}>();
  const navigate = useNavigate();

  const categoryLabel =
    category && category in CATEGORY_MAP ? CATEGORY_MAP[category] : null;

  const filteredPosts = useMemo(
    () =>
      categoryLabel
        ? mockPosts.filter((post) => post.category === categoryLabel)
        : [],
    [categoryLabel]
  );

  // 카테고리가 잘못된 경우
  if (!categoryLabel) {
    return <div className='p-4 font-semibold'>잘못된 경로입니다.</div>;
  }

  return (
    <div>
      {/* 상단바 */}
      <div className='flex justify-between items-center'>
        {/* 왼쪽: 뒤로가기 버튼 + 카테고리명 */}
        <div className='flex items-center'>
          <button
            className='flex items-center justify-center'
            onClick={() => navigate(`/community`)}>
            <div className='w-[50px] h-[50px]'>
              <ChevronLeft className='w-full h-full' />
            </div>
          </button>
          <span className='font-bold text-xl leading-[140%]'>
            {categoryLabel}
          </span>
        </div>

        {/* 오른쪽: 게시글 작성 버튼 */}
        <button
          className='flex items-center gap-[8px]'
          onClick={() => navigate(`/community/write`)}>
          <div className='w-[19px] h-[19px]'>
            <WritePost className='w-full h-full' />
          </div>
          <span className='font-bold text-xl leading-[140%]'>게시글 작성</span>
        </button>
      </div>

      {/* 게시글 리스트 */}
      <div className='flex flex-col mt-[22px] gap-[19px]'>
        {filteredPosts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FilteredPostList;
