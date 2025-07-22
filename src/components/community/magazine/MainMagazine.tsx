import BookMark from '@/assets/community/bookmark.svg?react';
import PlayTag from '@/components/main/PlayTag';
import type {MagazinePostType} from '@/types/community';

interface MainMagazine {
  magazine: MagazinePostType;
}

const MainMagazine = ({magazine}: MainMagazine) => {
  return (
    <div className='flex w-[95%] flex-col items-start gap-12'>
      {/* 매거진 이미지 */}
      <div
        className='flex flex-col w-full h-378 justify-start items-center gap-10 px-16 py-13 bg-[#DDE1E6] rounded-[10px] bg-no-repeat bg-center bg-cover'
        style={
          magazine.imgUrl ? {backgroundImage: `url(${magazine.imgUrl})`} : {}
        }>
        <div className='flex w-full justify-between items-center'>
          <PlayTag text={magazine.tag} />
          <BookMark className={`${magazine.isMarked && 'text-secondary'}`} />
        </div>
      </div>

      {/* 제목 */}
      <h1
        className='self-stretch text-gray-3 text-xl font-bold leading-[140%]
      line-clamp-1'>
        {magazine.title}
      </h1>

      {/* 부제목 */}
      <p className='line-clamp-1 text-gray-2'>{magazine.subTitle}</p>
    </div>
  );
};

export default MainMagazine;
