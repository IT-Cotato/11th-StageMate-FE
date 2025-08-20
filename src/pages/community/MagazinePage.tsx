import MainMagazine from '@/components/community/magazine/MainMagazine';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {useMagazines} from '@/hooks/useMagazine';
import type {Magazine} from '@/types/community';
import {useState} from 'react';
import Pagination from 'react-js-pagination';

const ITEMS_PER_PAGE = 4;

const MagazinePage = () => {
  {
    /**const [sortBy, setSortBy] = useState(0);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
     */
  }

  const [page, setPage] = useState<number>(1);
  const {data, isLoading, isError} = useMagazines(page, ITEMS_PER_PAGE);

  {
    /**   const handleOrderClick = (id: number, text: string) => {
    // todo : 백엔드 api 연결
    console.log(text, ' 으로 api 다시 호출');
    setSortBy(id);
    setIsOrderOpen(false);
  };
     */
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에러 발생!</div>;
  return (
    <div className='relative px-16'>
      {/* 정렬 선택 
      <div className='flex flex-col justify-start items-end absolute top-[-20px] right-0'>
        <div className='flex flex-col items-start w-93 gap-1'>
          <div
            onClick={() => setIsOrderOpen((prev) => !prev)}
            className='flex justify-between items-start self-stretch'>
            <p className='text-primary font-roboto text-[15px] font-bold leading-[140%]'>
              {MagazineOrder[sortBy].text}
            </p>
            <ChevronLeft
              className={`w-20 h-20 aspect-square ${isOrderOpen ? '-rotate-90' : 'rotate-90'}`}
            />
          </div>

          {isOrderOpen && (
            <div>
              {MagazineOrder.filter((order) => order.id !== sortBy).map(
                (order) => (
                  <p
                    key={order.id}
                    onClick={() => handleOrderClick(order.id, order.text)}
                    className='text-primary font-roboto text-[15px] font-bold leading-[140%]'>
                    {order.text}
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* 리스트 */}
      <div className='grid grid-cols-2 justify-items-center items-center gap-y-20'>
        {data?.list.map((magazine: Magazine) => (
          <MainMagazine
            key={magazine.id}
            magazine={{
              id: magazine.id,
              title: magazine.title,
              subTitle: magazine.subTitle,
              imageUrl: magazine.imageUrl,
              category: magazine.category,
              isScraped: magazine.isScraped,
            }}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className='flex justify-center mt-20 mb-20'>
        <Pagination
          activePage={data?.currentPage ?? 1}
          itemsCountPerPage={ITEMS_PER_PAGE}
          totalItemsCount={data?.totalElements ?? 0}
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

export default MagazinePage;
