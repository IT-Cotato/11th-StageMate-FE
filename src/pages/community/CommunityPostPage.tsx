import '@/styles/skeleton.css';
import {useParams} from 'react-router-dom';
import {
  getCommunityDetail,
  deleteCommunityPost,
  toggleCommunityPostLike,
  toggleCommunityPostScrap,
} from '@/api/communityApi';
import type {CommunityPostDetail} from '@/types/communityDetail';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import CommunityCategory from '@/components/community/common/CommunityCategory';
import PostHeaderInfo from '@/components/community/post/PostHeaderInfo';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import PostImageList from '@/components/community/post/PostImageList';
import PostComment from '@/components/community/post/PostComment';
import CommentInput from '@/components/community/post/CommentInput';
import {useState, useEffect, useRef, useCallback} from 'react';
import PostOptionModal from '@/components/modal/PostOptionModal';
import ConfirmModal from '@/components/modal/ConfirmModal';
import EditorViewer from '@/components/community/post/EditorViewer';
import {getUrlFromCategoryName, type UiCategory} from '@/util/categoryMapper';
import {useCommunityPostSafe} from '@/components/community/context/useCommunityPost';
import formatKoreanTime from '@/util/formatKoreanTime';
import type {JSONContent} from '@tiptap/react';

const decodeHtml = (s: string) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const stripTags = (s: string) => decodeHtml(s).replace(/<[^>]*>/g, '');

const normalizeTiptapJSON = (node: unknown): JSONContent => {
  if (!node) return {} as JSONContent;
  if (Array.isArray(node))
    return {type: 'doc', content: node.map(normalizeTiptapJSON)} as JSONContent;
  if (typeof node === 'object' && node !== null) {
    const objNode = node as Record<string, unknown>;
    if (objNode.type === 'text' && typeof objNode.text === 'string') {
      return {...objNode, text: stripTags(objNode.text)} as JSONContent;
    }
    if (Array.isArray(objNode.content)) {
      return {
        ...objNode,
        content: objNode.content.map(normalizeTiptapJSON),
      } as JSONContent;
    }
    return objNode as JSONContent;
  }
  return {} as JSONContent;
};

const CommunityPostPage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [confirmType, setConfirmType] = useState<
    null | 'delete' | 'report' | 'block'
  >(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {postId} = useParams();
  const [post, setPost] = useState<CommunityPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasLoaded = useRef(false);
  const communityContext = useCommunityPostSafe();

  useEffect(() => {
    if (!postId || hasLoaded.current) {
      setIsLoading(false);
      return;
    }

    hasLoaded.current = true;

    getCommunityDetail(Number(postId))
      .then((loadedPost) => {
        setPost(loadedPost);

        // Context에 게시글 데이터 설정
        if (communityContext) {
          communityContext.setPostData({
            postId: Number(postId),
            likeCount: loadedPost.likeCount || 0,
            scrapCount: loadedPost.scrapCount || 0,
            commentCount: loadedPost.commentCount || 0,
            isLiked: loadedPost.liked || false,
            isScrapped: loadedPost.scrapped || false,
          });
        }
      })
      .catch((err) => {
        console.error('게시글 불러오기 실패', err);
        setPost(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);

  // 좋아요 핸들러
  const handleLike = useCallback(async () => {
    if (!postId || !communityContext) return;

    try {
      await toggleCommunityPostLike(Number(postId));

      // 현재 상태를 기반으로 토글
      communityContext.setPostData({
        postId: Number(postId),
        likeCount: communityContext.isLiked
          ? communityContext.likeCount - 1
          : communityContext.likeCount + 1,
        scrapCount: communityContext.scrapCount,
        commentCount: communityContext.commentCount,
        isLiked: !communityContext.isLiked,
        isScrapped: communityContext.isScrapped,
      });
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  }, [postId, communityContext]);

  // 스크랩 핸들러
  const handleScrap = useCallback(async () => {
    if (!postId || !communityContext) return;

    try {
      await toggleCommunityPostScrap(Number(postId));

      // 현재 상태를 기반으로 토글
      communityContext.setPostData({
        postId: Number(postId),
        likeCount: communityContext.likeCount,
        scrapCount: communityContext.isScrapped
          ? communityContext.scrapCount - 1
          : communityContext.scrapCount + 1,
        commentCount: communityContext.commentCount,
        isLiked: communityContext.isLiked,
        isScrapped: !communityContext.isScrapped,
      });
    } catch (error) {
      console.error('스크랩 처리 실패:', error);
    }
  }, [postId, communityContext]);

  // 핸들러 설정 (postId가 변경될 때만 실행)
  useEffect(() => {
    if (!communityContext || !postId) return;

    communityContext.setHandlers({
      onLikeClick: handleLike,
      onScrapClick: handleScrap,
    });
  }, [postId]); // postId가 변경될 때만 실행

  const listWrapperRef = useHorizontalScroll();

  const handleDelete = async () => {
    if (!postId || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteCommunityPost(Number(postId));
      alert('게시글이 삭제되었습니다.');
      window.location.href = '/community';
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirm = () => {
    if (confirmType === 'delete') {
      handleDelete();
    }
    setConfirmType(null);
  };

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
    return (
      <div className='flex flex-col gap-[21px] pt-[13px] pb-[25px] relative'>
        <div className='flex flex-col gap-[21px] px-[17px]'>
          <div className='flex justify-between items-center relative'>
            <div className='skeleton-shimmer h-[26px] w-[60px] rounded-[10px]' />
            <div className='skeleton-shimmer h-[26px] w-[26px] rounded' />
          </div>

          <div className='skeleton-shimmer h-[40px] w-full rounded' />

          <div className='flex flex-col gap-2'>
            <div className='skeleton-shimmer h-[20px] w-full rounded' />
            <div className='skeleton-shimmer h-[20px] w-3/4 rounded' />
            <div className='skeleton-shimmer h-[20px] w-1/2 rounded' />
          </div>

          <div className='skeleton-shimmer h-[200px] w-full rounded' />

          <div className='skeleton-shimmer h-[20px] w-[20px] rounded' />
        </div>
      </div>
    );
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
                  if (type === 'edit' && post) {
                    const category = post.tradeCategory
                      ? '나눔 · 거래'
                      : post.category;
                    const categoryUrl = getUrlFromCategoryName(
                      category as UiCategory
                    );
                    window.location.href = `/community/${categoryUrl}/edit/${postId}`;
                  } else if (
                    type === 'delete' ||
                    type === 'report' ||
                    type === 'block'
                  ) {
                    setConfirmType(type);
                  }
                  setShowOptions(false);
                }}
                onClose={() => setShowOptions(false)}
              />
            </div>
          )}
        </div>

        <PostHeaderInfo
          title={post.title}
          nickname={post.authorName}
          date={formatKoreanTime(post.createdAt)}
          viewCount={post.viewCount}
          variant='detail'
        />

        <PostImageList
          imgUrls={post.imageUrls.map((img) => img.url)}
          wrapperRef={listWrapperRef as React.RefObject<HTMLUListElement>}
        />

        {typeof post.content === 'string' ? (
          <div
            className='prose'
            dangerouslySetInnerHTML={{__html: decodeHtml(post.content)}}
          />
        ) : (
          <EditorViewer content={normalizeTiptapJSON(post.content)} />
        )}
      </div>

      <PostComment />
      <CommentInput />

      {confirmType && (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
          <div className='w-full max-w-[600px] mx-auto'>
            <ConfirmModal
              type={confirmType}
              onCancel={() => setConfirmType(null)}
              onConfirm={handleConfirm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPostPage;
