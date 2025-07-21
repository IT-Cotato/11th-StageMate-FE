import {topRatedPerformances} from '@/mocks/mockTopRatedShows';
import Star from '@/assets/archive/archive-star.svg?react';

const TopRatedShowList = () => {
  return (
    <div className='flex items-center justify-center'>
      <ul className='flex flex-row sm:gap-50 gap-25'>
        {topRatedPerformances.map((performance, index) => (
          <li key={performance.id} className='relative  gap-4 flex-col'>
            <div className='bg-gray-1 sm:w-[138px] sm:h-[180px] w-100 h-120 items-center flex justify-center'>
              <span className='absolute top-4 left-9 text-xl font-medium text-primary'>
                {index + 1}
              </span>
              임시 이미지
            </div>
            <div className='flex flex-col justify-between'>
              <span className='text-xl'>{performance.title}</span>
              <div className='text-[18px] flex flex-row'>
                <Star />
                {performance.rating.toFixed(1)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedShowList;
