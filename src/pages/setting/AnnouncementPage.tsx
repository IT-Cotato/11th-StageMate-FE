import {getNocies} from '@/api/mypageApi';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import Announcement from '@/components/setting/Announcement';
import type {AnnouncementSummaryType} from '@/types/Announcement';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import Pagination from 'react-js-pagination';

const AnnouncementPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const {data, isLoading, error} = useQuery({
    queryKey: ['announcementList', currentPage],
    queryFn: () => getNocies({page: currentPage}),
  });

  if (isLoading) {
    return <div>공지사항 불러오는 중 ...</div>;
  }

  if (error) {
    return <div>공지사항을 불러오는 데 실패했습니다.</div>;
  }

  const AnnouncementList = data?.list || [];
  const ITEMS_PER_PAGE = data.pageSize;
  const totalItemsCount = data.totalElements;

  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title='공지사항' borderBottom />

      {/* announcement list */}
      <div className='py-24 px-20 flex flex-col justify-start items-center gap-14'>
        {AnnouncementList.map((announcement: AnnouncementSummaryType) => (
          <Announcement
            key={announcement.id}
            announcementSummary={announcement}
          />
        ))}
      </div>

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

export default AnnouncementPage;
