import BookMark from '@/assets/community/bookmark.svg?react';
import PlayTag from '@/components/main/PlayTag';

const MainMagazine = () => {
  return (
    <div className='flex w-272 flex-col items-start gap-12'>
      {/* 매거진 이미지 */}
      <div className='flex flex-col w-full h-378 justify-start items-center gap-10 px-16 py-13 rounded-[10px] bg-[#dde1e6]'>
        <div className='flex w-full justify-between items-center'>
          <PlayTag text='태그 뮤지컬' />
          <BookMark />
        </div>
      </div>

      {/* 제목 */}
      <h1
        className='self-stretch text-gray-3 text-xl font-bold leading-[140%]
      line-clamp-1'>
        죽느냐 사느냐 그것이 문제로다
      </h1>

      {/* 부제목 */}
      <p className='line-clamp-1'>
        아름다운 이야기 지금 시작합니다 많은 관심 부탁드립니다 매거진 부제목
      </p>
    </div>
  );
};

export default MainMagazine;
