import PlayTag from '../main/PlayTag';
interface SelectGenreModalProps {
  selectedGenre: string | null;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string | null>>;
  onClose: () => void;
}

const genreGroups = [
  ['창작 뮤지컬', '오리지널/내한 뮤지컬', '라이선스 뮤지컬'],
  ['넌버벌 퍼포먼스', '아동/가족 뮤지컬', '코미디'],
  ['드라마', '스릴러', '로맨스'],
  ['가족', '판타지'],
];

const SelectGenreModal = ({
  selectedGenre,
  setSelectedGenre,
  onClose,
}: SelectGenreModalProps) => {
  return (
    <div className='fixed sm:bottom-[60px] bottom-[45px] left-0 w-full flex justify-center items-end z-50'>
      <div className='sm:w-full  sm:h-[400px] h-300 bg-[#fff] rounded-t-[20px] flex flex-col items-center justify-between px-10 sm:pb-40 pb-10 sm:pt-20 pt-10 shadow-sm '>
        <div className='sm:w-[200px] w-100 h-[6px] bg-[#D9D9D9] rounded-full mb-10' />

        {genreGroups.map((group, i) => (
          <div
            key={i}
            className='w-full flex flex-wrap justify-center sm:gap-10 gap-5 sm:mb-10'>
            {group.map((genre) => (
              <PlayTag
                key={genre}
                text={genre}
                selected={selectedGenre === genre}
                onClick={setSelectedGenre}
              />
            ))}
          </div>
        ))}

        <button
          className='sm:w-full w-[370px] sm:h-48 h-30 bg-primary text-white text-lg sm:text-xl rounded-[14px] cursor-pointer'
          onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SelectGenreModal;
