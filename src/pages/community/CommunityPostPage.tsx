import '@/styles/skeleton.css';
import {useParams} from 'react-router-dom';
import {getCommunityDetail} from '@/api/communityApi';
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
      <div className='flex flex-col gap-[21px] pt-[13px] pb-[25px] relative'>
        <div className='flex flex-col gap-[21px] px-[17px]'>
          <div className='flex justify-between items-center relative'>
            <div className='skeleton-shimmer h-[26px] w-[60px] rounded-[10px]' />
            <div className='skeleton-shimmer h-[26px] w-[26px] rounded' />
          </div>

          <div className='flex flex-col gap-[12px]'>
            <div className='skeleton-shimmer h-[32px] w-3/4 rounded' />
            <div className='flex items-center gap-[8px]'>
              <div className='skeleton-shimmer h-[20px] w-[80px] rounded' />
              <div className='skeleton-shimmer h-[20px] w-[100px] rounded' />
              <div className='skeleton-shimmer h-[20px] w-[60px] rounded' />
            </div>
          </div>

          <div className='flex gap-[8px] overflow-x-auto'>
            {Array.from({length: 3}).map((_, index) => (
              <div
                key={index}
                className='skeleton-shimmer w-[120px] h-[120px] rounded-[10px] flex-shrink-0'
              />
            ))}
          </div>

          <div className='flex flex-col gap-[8px] min-h-[200px]'>
            <div className='skeleton-shimmer h-[20px] w-full rounded' />
            <div className='skeleton-shimmer h-[20px] w-5/6 rounded' />
            <div className='skeleton-shimmer h-[20px] w-4/5 rounded' />
            <div className='skeleton-shimmer h-[20px] w-full rounded' />
            <div className='skeleton-shimmer h-[20px] w-3/4 rounded' />
            <div className='skeleton-shimmer h-[20px] w-5/6 rounded' />
            <div className='skeleton-shimmer h-[20px] w-full rounded' />
            <div className='skeleton-shimmer h-[20px] w-4/5 rounded' />
          </div>
        </div>

        <div className='flex flex-col gap-[16px] px-[17px]'>
          <div className='skeleton-shimmer h-[20px] w-[60px] rounded' />
          {Array.from({length: 3}).map((_, index) => (
            <div key={index} className='flex flex-col gap-[8px]'>
              <div className='flex items-center gap-[8px]'>
                <div className='skeleton-shimmer h-[32px] w-[32px] rounded-full' />
                <div className='skeleton-shimmer h-[16px] w-[80px] rounded' />
                <div className='skeleton-shimmer h-[14px] w-[60px] rounded' />
              </div>
              <div className='skeleton-shimmer h-[16px] w-3/4 rounded ml-[40px]' />
            </div>
          ))}
        </div>

        <div className='flex items-center justify-between w-full bg-[#EBEBEB] px-[8px] py-[11px]'>
          <div className='flex items-center gap-[20px] flex-1'>
            <div className='skeleton-shimmer h-[37px] w-[37px] rounded-full' />
            <div className='skeleton-shimmer h-[20px] flex-1 rounded' />
          </div>
          <div className='skeleton-shimmer h-[20px] w-[20px] rounded' />
        </div>
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
