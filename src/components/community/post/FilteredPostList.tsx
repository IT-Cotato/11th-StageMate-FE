import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import WritePost from '@/assets/nav-icons/write-post.svg?react';
import {useNavigate, useParams} from 'react-router-dom';

const CATEGORY_MAP = {
  tip: '꿀팁',
  daily: '일상',
  share: '나눔 · 거래',
  hot: 'HOT',
} as const;

const FilteredPostList = () => {
  const {category} = useParams<{category?: keyof typeof CATEGORY_MAP}>();
  const navigate = useNavigate();

  // category 유효성 체크
  if (!category || !(category in CATEGORY_MAP)) {
    return <div className='p-4 font-semibold'>잘못된 경로입니다.</div>;
  }

  const categoryLabel = CATEGORY_MAP[category];

  return (
    <div className='pb-[20px]'>
      {/* 상단바 */}
      <div className='flex justify-between items-center'>
        {/* 왼쪽: 뒤로가기 버튼 + 카테고리명 */}
        <div className='flex items-center'>
          <button
            className='flex items-center justify-center'
            onClick={() => navigate(-1)}>
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
          onClick={() => navigate(`/community/${category}/write`)}>
          <div className='w-[19px] h-[19px]'>
            <WritePost className='w-full h-full' />
          </div>
          <span className='font-bold text-xl leading-[140%]'>게시글 작성</span>
        </button>
      </div>

      {/* TODO: 게시글 리스트 들어갈 자리 */}
    </div>
  );
};

export default FilteredPostList;
