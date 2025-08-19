/**
 * Category 명을 props로 전달받는 커뮤니티 뱃지 컴포넌트
 * props: 일상, 꿀팁, 나눔거래 */

interface CommunityCategoryProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const CommunityCategory = ({
  label,
  isSelected,
  onClick,
}: CommunityCategoryProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-[93px] h-[36px] justify-center items-center rounded-[10px] border-[1px] cursor-pointer border-[#7B4CFA] font-semibold bg-[#fff] ${isSelected ? 'bg-primary text-white' : ''}`}>
      {label}
    </div>
  );
};

export default CommunityCategory;
