import CommunityCategory from '@/components/community/common/CommunityCategory';
import ContentEditor from '@/components/community/content/ContentEditor';
import {useState} from 'react';
import {ShareTemplate} from '@/constant';
import ShareBadgeSection from '@/components/community/content/ShareBadgeSection';
import EditorToggleSection from '@/components/community/content/EditorToggleSection';

const CommunityEditPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedCategory = '나눔 · 거래'; // 임시 설정
  const [clickedPlayBadge, setClickedPlayBadge] = useState<string | null>(null);
  const [clickedCategoryBadge, setClickedCategoryBadge] = useState<
    string | null
  >(null);

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
    <div>
      <div className='flex flex-row justify-between items-center px-20 py-12'>
        <div className='flex flex-row gap-10'>
          {['일상', '나눔 · 거래', '꿀팁'].map((category) => (
            <CommunityCategory
              key={category}
              category={category}
              isSelected={selectedCategory === category}
            />
          ))}
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
          className={`rounded-[5px] border-[1px] text-2xl px-28 py-[8.5px] font-medium transition-colors duration-200 
        ${isSubmitting ? 'bg-primary text-[#fff] cursor-not-allowed' : 'bg-[#fff] text-primary cursor-pointer'}`}>
          등록하기
        </button>
      </form>
    </div>
  );
};

export default CommunityEditPage;
