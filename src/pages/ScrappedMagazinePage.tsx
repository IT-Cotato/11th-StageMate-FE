import {useState} from 'react';
import Pagination from 'react-js-pagination';
import PostCardItem from '@/components/community/post/PostCardItem';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {useUserMagazines} from '@/hooks/useUserContents';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ITEMS_PER_PAGE = 6;

const ScrappedMagazinePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {data, isError, isLoading} = useUserMagazines(
    currentPage,
    ITEMS_PER_PAGE
  );
  const magazines = data?.data.list ?? [];
  const totalItemsCount = data?.data.totalElements ?? 0;
  const {goToMagazineDetail} = useCommunityNavigation();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className='flex justify-center text-gray-2 text-sm'>
        매거진을 불러오는 데 실패했습니다.
      </div>
    );
  return (
    <div className='flex flex-col gap-40 justify-center'>
      {/* 상단 */}
      <BackButtonTitleHeader title='스크랩한 매거진 모아보기' between />

      {/* 리스트 */}
      <ul className='flex flex-wrap gap-y-60 gap-x-24 px-35'>
        {magazines.map((magazine) => (
          <PostCardItem
            key={magazine.id}
            title={magazine.title}
            subTitle={magazine.subTitle}
            category={magazine.category}
            isScraped={magazine.isScraped}
            imageUrl={magazine.imageUrl}
            isScrapMagazine={true}
            placeholderText={magazine.title}
            onClick={() => goToMagazineDetail(magazine.id)}
          />
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className='flex justify-center'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={ITEMS_PER_PAGE}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          innerClass='flex gap-6'
          itemClass='px-5 py-1 text-sm'
          activeClass='font-bold'
          prevPageText='<'
          nextPageText='>'
          firstPageText='<<'
          lastPageText='>>'
        />
      </div>
    </div>
  );
};

export default ScrappedMagazinePage;
