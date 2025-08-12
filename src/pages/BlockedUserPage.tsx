import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import BlockedUser from '@/components/setting/BlockedUser';
import {mockList} from '@/mocks/mockBlockedUsers';
import {useState} from 'react';
import Pagination from 'react-js-pagination';
const ITEMS_PER_PAGE = 10;

const BlockedUserPage = () => {
  const blockedUserList = mockList;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItemsCount = blockedUserList.length;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = blockedUserList.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex flex-col gap-40'>
      {/* 상단 */}
      <BackButtonTitleHeader title='차단한 사용자 목록' between />

      {/* 리스트 */}
      <ul className='flex flex-col gap-10'>
        {currentItems.map((user) => (
          <BlockedUser key={user.id} user={user} />
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

export default BlockedUserPage;
