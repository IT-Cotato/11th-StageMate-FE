import CommunityCategory from '@/components/community/common/CommunityCategory';
import ContentEditor from '@/components/community/content/ContentEditor';
import {useState, useEffect} from 'react';
import {ShareTemplate} from '@/constant';
import ShareBadgeSection from '@/components/community/content/ShareBadgeSection';
import EditorToggleSection from '@/components/community/content/EditorToggleSection';
import {useNavigate, useParams} from 'react-router-dom';
import {
  categoryList,
  getCategoryNameFromUrl,
  getUrlFromCategoryName,
  uiToApiCategory,
  type WriteableUiCategory,
} from '@/util/categoryMapper';
import {createCommunityPost, updateCommunityPost, getCommunityDetail} from '@/api/communityApi';
import type {CommunityPostCreateRequest, CommunityPostUpdateRequest} from '@/types/communityDetail';

const CommunityEditPage = () => {
  const navigate = useNavigate();
  const {category, postId} = useParams();
  const rawCategory = getCategoryNameFromUrl(category ?? '');
  const selectedCategory = rawCategory === 'HOT' ? '일상' : rawCategory;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [existingPost, setExistingPost] = useState<any>(null);
  const [keepImageIds, setKeepImageIds] = useState<number[]>([]);

  const [clickedPlayBadge, setClickedPlayBadge] = useState<string | null>(null);
  const [clickedCategoryBadge, setClickedCategoryBadge] = useState<
    string | null
  >(null);

  const isEditMode = !!postId;

  useEffect(() => {
    if (isEditMode && postId) {
      getCommunityDetail(Number(postId))
        .then((post) => {
          setExistingPost(post);
          setTitle(post.title);
          setContent(post.content);
          setKeepImageIds(post.imageUrls.map(img => img.id));
          if (post.tradeCategory) {
            setClickedCategoryBadge(post.tradeCategory);
          }
        })
        .catch((error) => {
          console.error('게시글 로드 실패:', error);
          alert('게시글을 불러올 수 없습니다.');
          navigate('/community');
        });
    }
  }, [isEditMode, postId, navigate]);

  const handleCategoryClick = (categoryName: string) => {
    const urlSlug = getUrlFromCategoryName(categoryName);
    navigate(`/community/${urlSlug}/write`);
  };
  const togglePlayBadge = (text: string) => {
    setClickedPlayBadge((prev) => (prev === text ? null : text));
  };
  const toggleCategoryBadge = (text: string) => {
    setClickedCategoryBadge((prev) => (prev === text ? null : text));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (selectedCategory === '나눔 · 거래' && !clickedPlayBadge) {
      alert('공연 카테고리를 선택해주세요.');
      return;
    }

    if (selectedCategory === '나눔 · 거래' && !clickedCategoryBadge) {
      alert('나눔·거래 방식을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (isEditMode && postId) {
        const updateRequest: CommunityPostUpdateRequest = {
          title: title.trim(),
          content: content,
          category: uiToApiCategory[selectedCategory as WriteableUiCategory],
          tradeCategory: selectedCategory === '나눔 · 거래' ? (clickedPlayBadge as '뮤지컬' | '연극') : null,
          tradeMethod: selectedCategory === '나눔 · 거래' ? (clickedCategoryBadge === '무료나눔' ? '선착나눔' : clickedCategoryBadge as '추첨나눔' | '판매') : null,
          membersOnly: false,
          remainImageIds: keepImageIds,
        };
        
        const updatedPost = await updateCommunityPost(Number(postId), updateRequest, images);
        alert('게시글이 수정되었습니다.');
        const categoryUrl = getUrlFromCategoryName(selectedCategory!);
        navigate(`/community/${categoryUrl}/${updatedPost.id}`);
      } else {
        const createRequest: CommunityPostCreateRequest = {
          title: title.trim(),
          content: content,
          category: uiToApiCategory[selectedCategory as WriteableUiCategory],
          tradeCategory: selectedCategory === '나눔 · 거래' ? (clickedPlayBadge as '뮤지컬' | '연극') : null,
          tradeMethod: selectedCategory === '나눔 · 거래' ? (clickedCategoryBadge === '무료나눔' ? '선착나눔' : clickedCategoryBadge as '추첨나눔' | '판매') : null,
          membersOnly: false,
        };
        
        console.log('Create Request:', createRequest);
        console.log('Images:', images);
        
        const newPost = await createCommunityPost(createRequest, images);
        alert('게시글이 작성되었습니다.');
        const categoryUrl = getUrlFromCategoryName(selectedCategory!);
        navigate(`/community/${categoryUrl}/${newPost.id}`);
      }
    } catch (error) {
      console.error('게시글 처리 실패:', error);
      alert(isEditMode ? '게시글 수정에 실패했습니다.' : '게시글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='flex flex-row justify-between items-center px-20 py-12'>
        <div className='flex flex-row gap-10'>
          {categoryList
            .filter((categoryName) => categoryName !== 'HOT')
            .map((categoryName) => (
              <CommunityCategory
                key={categoryName}
                label={categoryName}
                isSelected={selectedCategory === categoryName}
                onClick={() => handleCategoryClick(categoryName)}
              />
            ))}
        </div>
      </div>

      <ContentEditor
        defaultContent={isEditMode ? content : (selectedCategory === '나눔 · 거래' ? ShareTemplate : '')}
        title={title}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onImagesChange={setImages}
      />
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />

      {selectedCategory === '나눔 · 거래' && (
        <ShareBadgeSection
          clickedPlayBadge={clickedPlayBadge}
          clickedCategoryBadge={clickedCategoryBadge}
          togglePlayBadge={togglePlayBadge}
          toggleCategoryBadge={toggleCategoryBadge}
        />
      )}
      <EditorToggleSection />
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />

      <form
        onSubmit={handleSubmit}
        className='flex w-full h-[140px] justify-center items-center'>
        <button
          type='submit'
          disabled={isSubmitting}
          className={`rounded-[5px] border-[1px] sm:text-2xl text-xl px-28 py-[8.5px] font-medium transition-colors duration-200 
        ${isSubmitting ? 'bg-primary text-[#fff] cursor-not-allowed' : 'bg-[#fff] text-primary cursor-pointer'}`}>
          {isSubmitting ? (isEditMode ? '수정 중...' : '등록 중...') : (isEditMode ? '수정하기' : '등록하기')}
        </button>
      </form>
    </div>
  );
};

export default CommunityEditPage;
