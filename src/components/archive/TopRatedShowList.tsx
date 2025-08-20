import Star from '@/assets/archive/archive-star.svg?react';
import {useArchiveTopRating} from '@/hooks/useArchive';
import type {Performance} from '@/types/performance';
import '@/styles/skeleton.css';
import {useNavigate} from 'react-router-dom';

const TopRatedShowList = () => {
  const {data, isLoading, isError} = useArchiveTopRating();
  const performances = data?.data ?? [];
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <ul className='flex flex-row gap-40'>
          {Array.from({length: 3}).map((_, index) => (
            <li key={index} className='flex flex-col gap-1 items-center'>
              <div className='skeleton-shimmer sm:w-[138px] sm:h-[180px] w-100 h-170 rounded-lg' />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError || performances.length === 0) {
    return (
      <div className='flex justify-center items-center text-gray-500 text-lg'>
        이번 달에는 평점 순위 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center'>
      <ul className='flex flex-row gap-40'>
        {data.data.map((performance: Performance, index: number) => (
          <li
            key={performance.id}
            className='flex relative gap-7 flex-col cursor-pointer'
            onClick={() => navigate(`write/${performance.id}`)}>
            <div className='sm:w-[138px] sm:h-[180px] w-100 h-120 flex items-center justify-center'>
              <span className='absolute top-9 left-9 w-25 h-25 bg-gray-1 rounded-full shadow-md flex items-center justify-center text-xl font-medium text-primary'>
                {performance.ranking || index + 1}
              </span>
              {performance.imageUrl ? (
                <img
                  src={performance.imageUrl}
                  alt={performance.title}
                  className='object-cover w-full h-full rounded-[7px]'
                />
              ) : (
                '이미지 없음'
              )}
            </div>
            <div className='flex flex-col justify-between gap-7 px-10'>
              <span className='sm:text-[18px] text-sm font-medium truncate w-100'>
                {performance.title}
              </span>
              <div className='flex flex-row items-center gap-1'>
                <Star />
                <span className='text-[14px]'>
                  {performance.rating?.toFixed(1)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedShowList;
