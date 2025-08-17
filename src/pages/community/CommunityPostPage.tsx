import '@/styles/skeleton.css';
import {useParams} from 'react-router-dom';
import {getCommunityDetail} from '@/api/community';
import type {CommunityPostDetail} from '@/types/communityDetail';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import CommunityCategory from '@/components/community/common/CommunityCategory';
import PostHeaderInfo from '@/components/community/post/PostHeaderInfo';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import PostImageList from '@/components/community/post/PostImageList';
import PostComment from '@/components/community/post/PostComment';
import CommentInput from '@/components/community/post/CommentInput';
import {useState, useEffect} from 'react';
import PostOptionModal from '@/components/modal/PostOptionModal';
import ConfirmModal from '@/components/modal/ConfirmModal';
import EditorViewer from '@/components/community/post/EditorViewer';

const CommunityPostPage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [confirmType, setConfirmType] = useState<
    null | 'delete' | 'report' | 'block'
  >(null);

  const {postId} = useParams();
  const [post, setPost] = useState<CommunityPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      return;
    }
    getCommunityDetail(Number(postId))
      .then(setPost)
      .catch((err) => {
        console.error('게시글 불러오기 실패', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);
  const listWrapperRef = useHorizontalScroll();

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-100 h-100 border-4 border-gray-300 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!post) {
    return <div className='p-4'>존재하지 않는 게시글입니다.</div>;
  }

  return (
    <div className='flex flex-col gap-[21px] pt-[13px] pb-[25px] relative'>
      <div className='flex flex-col gap-[21px] px-[17px]'>
        <div className='flex justify-between items-center relative'>
          <CommunityCategory label={post.tradeCategory || post.category} />
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
          authorName={post.authorName}
          date={post.createdAt}
          viewCount={post.viewCount}
          variant='detail'
        />

        <PostImageList
          imgUrls={post.imageUrls.map((img) => img.url)}
          wrapperRef={listWrapperRef as React.RefObject<HTMLUListElement>}
        />

        <EditorViewer content={post.content} />
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
