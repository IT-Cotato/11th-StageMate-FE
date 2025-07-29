import {useParams} from 'react-router-dom';
import {mockPosts} from '@/mocks/mockPosts';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import CommunityCategory from '@/components/community/common/CommunityCategory';
import PostHeaderInfo from '@/components/community/post/PostHeaderInfo';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import PostImageList from '@/components/community/post/PostImageList';
import PostComment from '@/components/community/post/PostComment';
import CommentInput from '@/components/community/post/CommentInput';
import {useState} from 'react';
import PostOptionModal from '@/components/modal/PostOptionModal';
import ConfirmModal from '@/components/modal/ConfirmModal';

const CommunityPostPage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [confirmType, setConfirmType] = useState<
    null | 'delete' | 'report' | 'block'
  >(null);

  const {postId} = useParams();
  const post = mockPosts.find((p) => p.id === Number(postId));
  const listWrapperRef = useHorizontalScroll();

  if (!post) {
    return <div className='p-4'>존재하지 않는 게시글입니다.</div>;
  }

  return (
    <div className='flex flex-col gap-[21px] pt-[13px] pb-[25px] relative'>
      <div className='flex flex-col gap-[21px] px-[17px]'>
        <div className='flex justify-between items-center relative'>
          <CommunityCategory category={post.category} />
          <EllipsisVertical
            className='w-[26px] h-[26px] cursor-pointer'
            onClick={() => {
              setShowOptions((prev) => !prev);
            }}
          />

          {showOptions && (
            <div className='absolute z-40 top-full right-0'>
              <PostOptionModal
                showEdit
                showDelete
                onSelect={(type) => {
                  setConfirmType(type);
                }}
                onClose={() => setShowOptions(false)}
              />
            </div>
          )}
        </div>

        <PostHeaderInfo
          title={post.title}
          nickname={post.nickname}
          date={post.date}
          viewCount={post.viewCount}
          variant='detail'
        />
        <PostImageList
          imgUrls={post.imgUrls}
          wrapperRef={listWrapperRef as React.RefObject<HTMLUListElement>}
        />
        <p className='font-normal text-[16px] leading-[110%] whitespace-pre-wrap break-words'>
          {post.content}
        </p>
      </div>

      <PostComment />
      <CommentInput />

      {confirmType && (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
          <div className='w-full max-w-[600px] mx-auto'>
            <ConfirmModal
              type={confirmType}
              onCancel={() => setConfirmType(null)}
              onConfirm={() => {
                setConfirmType(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPostPage;
