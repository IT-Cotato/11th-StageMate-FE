// 커뮤니티 게시글 상세 페이지
import {useParams} from 'react-router-dom';
import {mockPosts} from '@/mocks/mockPosts';
import {mockComments} from '@/mocks/mockComments';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import CommunityCategory from '@/components/community/common/CommunityCategory';
import PostHeaderInfo from '@/components/community/post/PostHeaderInfo';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';

const CommunityPostPage = () => {
  const {postId} = useParams();
  const post = mockPosts.find((p) => p.id === Number(postId));
  const listWrapperRef = useHorizontalScroll();

  if (!post) {
    return <div className='p-4'>존재하지 않는 게시글입니다.</div>;
  }

  return (
    <div className='flex flex-col gap-[21px] pt-[13px] pb-[40px] px-[33px]'>
      <div className='flex justify-between items-center'>
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
      <ul ref={listWrapperRef} className='flex w-full overflow-x-auto gap-20'>
        {post.imgUrls?.length
          ? post.imgUrls.map((url, index) => (
              <li
                key={index}
                className='min-w-[220px] h-[220px] bg-no-repeat bg-center bg-cover rounded-md shrink-0'
                style={{backgroundImage: `url(${url})`}}
              />
            ))
          : Array(4)
              .fill(null)
              .map((_, index) => (
                <li
                  key={index}
                  className='min-w-[220px] h-[220px] bg-gray-1 rounded-md shrink-0 flex items-center justify-center text-sm text-black'>
                  게시글 사진
                </li>
              ))}
      </ul>
      <p className='font-normal text-[16px] leading-[110%] white-space: whitespace-pre-wrap break-words'>
        {post.content}
      </p>
    </div>
  );
};

export default CommunityPostPage;
