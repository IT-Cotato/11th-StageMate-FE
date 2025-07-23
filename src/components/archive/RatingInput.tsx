import StarOutline from '@/assets/archive/archive-star-outline.svg?react';
import StarHalf from '@/assets/archive/archive-star-half.svg?react';
import StarFilled from '@/assets/archive/archive-star.svg?react';

interface RatingInputProps {
  rating: number;
  setRating: (value: number) => void;
}

const RatingInput = ({rating, setRating}: RatingInputProps) => {
  const handleStarClick = (starIndex: number) => {
    const currentValue = starIndex;
    const nextRating =
      rating === currentValue - 0.5
        ? currentValue
        : rating === currentValue
          ? 0
          : currentValue - 0.5;

    setRating(nextRating);
  };

  const renderStar = (index: number) => {
    const fullValue = index;
    const halfValue = index - 0.5;

    if (rating >= fullValue) {
      return <StarFilled className='sm:w-48 sm:h-48 w-30 h-30' />;
    } else if (rating >= halfValue) {
      return <StarHalf className='sm:w-48 sm:h-48 w-30 h-30' />;
    } else {
      return <StarOutline className='sm:w-48 sm:h-48 w-30 h-30' />;
    }
  };

  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className='cursor-pointer'
          onClick={() => handleStarClick(index)}>
          {renderStar(index)}
        </div>
      ))}
    </div>
  );
};

export default RatingInput;
