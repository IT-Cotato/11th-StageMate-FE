import Check from '@/assets/community/editor-icons/editor-icon-check.svg?react';
import CategoryBadge from '@/components/global/CategoryBadge';

interface ShareBadgeSectionProps {
  clickedPlayBadge: string | null;
  clickedCategoryBadge: string | null;
  togglePlayBadge: (text: string) => void;
  toggleCategoryBadge: (text: string) => void;
}

const ShareBadgeSection = ({
  clickedPlayBadge,
  clickedCategoryBadge,
  togglePlayBadge,
  toggleCategoryBadge,
}: ShareBadgeSectionProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between items-center px-48 py-10'>
        <div className='flex items-center gap-22'>
          <Check />
          <p className='text-2xl'>공연 카테고리 선택</p>
        </div>
        <div className='flex gap-8'>
          {['연극', '뮤지컬'].map((text) => (
            <div
              key={text}
              onClick={() => togglePlayBadge(text)}
              className='cursor-pointer'>
              <CategoryBadge
                text={text}
                variant={clickedPlayBadge === text ? 'default' : 'editor'}
              />
            </div>
          ))}
        </div>
      </div>
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />
      <div className='flex flex-row justify-between items-center px-48 py-10'>
        <div className='flex gap-22 items-center '>
          <Check />
          <p className='text-2xl'>나눔 · 거래 방식 선택</p>
        </div>
        <div className='flex gap-8'>
          {['추첨나눔', '무료나눔', '판매'].map((text) => (
            <div
              key={text}
              onClick={() => toggleCategoryBadge(text)}
              className='cursor-pointer'>
              <CategoryBadge
                text={text}
                variant={clickedCategoryBadge === text ? 'default' : 'editor'}
              />
            </div>
          ))}
        </div>
      </div>
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />
    </div>
  );
};

export default ShareBadgeSection;
