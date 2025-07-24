// 커뮤니티 게시글 상세 페이지
import {useParams} from 'react-router-dom';
import {mockPosts} from '@/mocks/mockPosts';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import CommunityCategory from '@/components/community/common/CommunityCategory';
import PostHeaderInfo from '@/components/community/post/PostHeaderInfo';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import PostImageList from '@/components/community/post/PostImageList';
import PostComment from '@/components/community/post/PostComment';

const CommunityPostPage = () => {
  const {postId} = useParams();
  const post = mockPosts.find((p) => p.id === Number(postId));
  const listWrapperRef = useHorizontalScroll();

  if (!post) {
    return <div className='p-4'>존재하지 않는 게시글입니다.</div>;
  }

  return (
    <div className='flex flex-col gap-[21px] pt-[13px] pb-[40px]'>
      <div className='flex flex-col gap-[21px] px-[17px]'>
        <div className='flex justify-between items-center '>
          <CommunityCategory category={post.category} />
          <EllipsisVertical className='w-[26px] h-[26px]' />
        </div>

        <PostHeaderInfo
          title={post.title}
          nickname={post.nickname}
          date={post.date}
          viewCount={post.viewCount}
          variant='detail'
        />
        <PostImageList
          wrapperRef={listWrapperRef as React.RefObject<HTMLUListElement>}
        />
        <p className='font-normal text-[16px] leading-[110%] white-space: whitespace-pre-wrap break-words '>
          {post.content}
        </p>
      </div>

      <PostComment />
    </div>
  );
};

export default CommunityPostPage;
