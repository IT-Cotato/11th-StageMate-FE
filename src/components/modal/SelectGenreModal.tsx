import {genreGroups} from '@/constant';
import PlayTag from '../main/PlayTag';

interface SelectGenreModalProps {
  selectedGenre: string[];
  setSelectedGenre: (genre: string) => void;
  onClose: () => void;
}

const SelectGenreModal = ({
  selectedGenre,
  setSelectedGenre,
  onClose,
}: SelectGenreModalProps) => {
  return (
    <div className='fixed sm:bottom-[60px] bottom-[45px] left-0 w-full flex justify-center items-end z-50'>
      <div className='sm:w-full h-300 bg-[#fff] rounded-t-[20px] flex flex-col items-center justify-between px-10 sm:pb-40 pb-10 sm:pt-20 pt-10 shadow-sm '>
        <div className='sm:w-[200px] w-100 h-[6px] bg-[#D9D9D9] rounded-full mb-10' />

        <div className='w-full flex flex-wrap justify-center gap-15'>
          {genreGroups.map((genre) => (
            <PlayTag
              key={genre}
              text={genre}
              selected={selectedGenre.includes(genre)}
              onClick={() => setSelectedGenre(genre)}
            />
          ))}
        </div>

        <button
          className='sm:w-full w-[370px] sm:h-48 h-30 bg-primary text-white text-lg sm:text-xl rounded-[14px] cursor-pointer hover:bg-primary/90'
          onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SelectGenreModal;
