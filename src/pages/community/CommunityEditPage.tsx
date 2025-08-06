import CommunityCategory from '@/components/community/common/CommunityCategory';
import ContentEditor from '@/components/community/content/ContentEditor';
import {useState} from 'react';
import {ShareTemplate} from '@/constant';
import ShareBadgeSection from '@/components/community/content/ShareBadgeSection';
import EditorToggleSection from '@/components/community/content/EditorToggleSection';
import {useNavigate, useParams} from 'react-router-dom';

const categoryMap: Record<string, string> = {
  daily: '일상',
  share: '나눔 · 거래',
  tip: '꿀팁',
} as const;

const reverseCategoryMap = {
  일상: 'daily',
  '나눔 · 거래': 'share',
  꿀팁: 'tip',
} as const;

type CategoryName = keyof typeof reverseCategoryMap;

const CommunityEditPage = () => {
  const navigate = useNavigate();
  const {category} = useParams();
  const selectedCategory = categoryMap[category ?? ''] ?? '일상';
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [clickedPlayBadge, setClickedPlayBadge] = useState<string | null>(null);
  const [clickedCategoryBadge, setClickedCategoryBadge] = useState<
    string | null
  >(null);

  const handleCategoryClick = (categoryName: CategoryName) => {
    const key = reverseCategoryMap[categoryName];
    if (key) navigate(`/community/${key}/write`);
  };
  const togglePlayBadge = (text: string) => {
    setClickedPlayBadge((prev) => (prev === text ? null : text));
  };
  const toggleCategoryBadge = (text: string) => {
    setClickedCategoryBadge((prev) => (prev === text ? null : text));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // submit 로직 todo
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='flex flex-row justify-between items-center px-20 py-12'>
        <div className='flex flex-row gap-10'>
          {(Object.values(categoryMap) as CategoryName[]).map(
            (categoryName) => (
              <CommunityCategory
                key={categoryName}
                category={categoryName}
                isSelected={selectedCategory === categoryName}
                onClick={() => handleCategoryClick(categoryName)}
              />
            )
          )}
        </div>
      </div>

      <ContentEditor
        defaultContent={selectedCategory === '나눔 · 거래' ? ShareTemplate : ''}
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
          등록하기
        </button>
      </form>
    </div>
  );
};

export default CommunityEditPage;
