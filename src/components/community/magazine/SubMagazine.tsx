import PlayTag from '@/components/main/PlayTag';
import type {SubMagazinePostType} from '@/types/community';
import {useNavigate} from 'react-router-dom';
import BookMark from '@/assets/community/bookmark.svg?react';

interface SubMagazine {
  magazine: SubMagazinePostType;
}

const SubMagazine = ({magazine}: SubMagazine) => {
  const navigate = useNavigate();

  return (
    <div className='flex w-250 flex-col items-start gap-12'>
      {/* 매거진 이미지 */}
      <div
        onClick={() => navigate(`/magazine/${magazine.id}`)}
        className='flex flex-col w-full h-378 justify-start items-center gap-10 px-16 py-13 bg-[#DDE1E6] rounded-[10px] bg-no-repeat bg-center bg-cover hover:cursor-pointer'
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
        onClick={() => navigate(`/magazine/${magazine.id}`)}
        className='text-gray-3 text-xl font-bold leading-[140%]
          line-clamp-1 hover:cursor-pointer'>
        {magazine.title}
      </h1>
    </div>
  );
};

export default SubMagazine;
