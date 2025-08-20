import BookMark from '@/assets/community/bookmark.svg?react';
import PlayTag from '@/components/main/PlayTag';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import type {MagazinePostType} from '@/types/community';

interface MainMagazineProps {
  magazine: MagazinePostType;
}

const MainMagazine = ({magazine}: MainMagazineProps) => {
  const {goToMagazineDetail} = useCommunityNavigation();

  return (
    <div className='flex w-[95%] flex-col items-start gap-12'>
      {/* 매거진 이미지 */}
      <div
        onClick={() => goToMagazineDetail(magazine.id)}
        className='flex flex-col w-full h-378 justify-start items-center gap-10 px-16 py-13 bg-[#DDE1E6] rounded-[10px] bg-no-repeat bg-center bg-cover hover:cursor-pointer'
        style={
          magazine.imageUrl
            ? {backgroundImage: `url(${magazine.imageUrl})`}
            : {}
        }>
        <div className='flex w-full justify-between items-center'>
          <PlayTag text={magazine.category} />
          <BookMark className={`${magazine.isScraped && 'text-secondary'}`} />
        </div>
      </div>

      {/* 제목 */}
      <h1
        onClick={() => goToMagazineDetail(magazine.id)}
        className='text-gray-3 text-xl font-bold leading-[140%]
      line-clamp-1 hover:cursor-pointer'>
        {magazine.title}
      </h1>

      {/* 부제목 */}
      <p
        onClick={() => goToMagazineDetail(magazine.id)}
        className='line-clamp-1 text-gray-2 hover:cursor-pointer'>
        {magazine.subTitle}
      </p>
    </div>
  );
};

export default MainMagazine;
