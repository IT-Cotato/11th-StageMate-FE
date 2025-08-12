import Search from '@/assets/search.svg?react';
import {useState, useRef, useEffect} from 'react';
import {type ImageItem} from '@/api/searchApi';
import {useInfiniteImageSearch} from '@/hooks/useInfinityQuery';
import '@/styles/skeleton.css';
import {useDebounce} from '@/hooks/useDebounce';
import {useLocation, useNavigate} from 'react-router-dom';

const ImageSearchPage = () => {
  const location = useLocation();
  const selectedDateFromState = location.state?.selectedDate;
  const [query, setQuery] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 500);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const selectedDate =
    selectedDateFromState instanceof Date
      ? selectedDateFromState
      : selectedDateFromState
        ? new Date(selectedDateFromState)
        : null;

  const onImageClick = (img: ImageItem) => {
    if (window.confirm('이 이미지를 선택하시겠습니까?')) {
      const imageUrl = img.link;
      const imageFile = null;

      navigate('/archive/write', {
        state: {
          mode: 'create',
          selectedDate,
          imageUrl,
          imageFile,
        },
      });
    }
  };
  // 에러 이미지 예외처리
  const handleImageError = (link: string) => {
    setBrokenImages((prev) => new Set(prev).add(link));
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isFetching,
  } = useInfiniteImageSearch(debouncedQuery);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤 감지
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {threshold: 1.0}
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 모든 페이지 아이템 합치기
  const images: ImageItem[] = data?.pages.flatMap((page) => page.items) ?? [];

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setHasSearched(true);
  };

  return (
    <div className='flex flex-col gap-15'>
      <h1 className='font-bold text-[25px]'>이미지 검색하기</h1>

      <form
        className='flex flex-row bg-[#f2f4f8] shadow-md h-56 w-400 items-center px-20 gap-20 rounded-[20px]'
        onSubmit={(e) => e.preventDefault()}>
        <Search className='text-gray-3 cursor-pointer' onClick={onSubmit} />
        <input
          type='text'
          placeholder='이미지를 검색하세요.'
          className='outline-none flex-grow'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {error && (
        <p className='text-red-500 mt-4'>검색 중 오류가 발생했습니다.</p>
      )}

      {/* 첫 로딩 스켈레톤 */}
      {isFetching && !isFetchingNextPage && images.length === 0 && (
        <div className='mt-6 grid grid-cols-3 gap-30'>
          {Array.from({length: 9}).map((_, i) => (
            <div
              key={i}
              className='w-[150px] h-[150px] rounded-md skeleton-shimmer'
            />
          ))}
        </div>
      )}

      {!isFetching &&
        !isFetchingNextPage &&
        images.length === 0 &&
        !error &&
        hasSearched && ( // 검색 시도 했을 때만 메시지 보여줌
          <p className='mt-6 text-center text-gray-500'>
            검색 결과가 없습니다.
          </p>
        )}

      {/* 이미지 리스트 */}
      <div className='mt-6 grid grid-cols-3 gap-30'>
        {images
          .filter((img) => !brokenImages.has(img.link))
          .map((img) => (
            <img
              key={img.link}
              src={img.link}
              alt={img.title}
              onError={() => handleImageError(img.link)}
              onClick={() => onImageClick(img)}
              className='rounded-md w-[150px] h-[150px] object-cover cursor-pointer hover:bg-white/80 hover:scale-105 transition-transform duration-200 ease-in-out'
            />
          ))}

        {/* 다음 페이지 로딩 시 스켈레톤 */}
        {isFetchingNextPage &&
          Array.from({length: 9}).map((_, i) => (
            <div
              key={`next-${i}`}
              className='w-[150px] h-[150px] rounded-md skeleton-shimmer'
            />
          ))}
      </div>

      {/* 스크롤 트리거 */}
      <div ref={observerRef} className='h-10' />
    </div>
  );
};

export default ImageSearchPage;
