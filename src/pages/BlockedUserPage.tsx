import {getBlockedList} from '@/api/blockApi';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import BlockedUser from '@/components/setting/BlockedUser';
import type {BlockedUserType} from '@/types/blocked';
import {useQuery} from '@tanstack/react-query';
import {useState, useEffect} from 'react';
import Pagination from 'react-js-pagination';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteUserBlocked} from '@/api/blockApi';
import Modal from '@/components/global/Modal';
import LoadingOverlay from '@/components/global/LoadingOverlay';

const BlockedUserPage = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const {data, isLoading, error} = useQuery({
    queryKey: ['announcementList', currentPage],
    queryFn: () => getBlockedList({page: currentPage}),
  });

  const unblockMutation = useMutation({
    mutationFn: deleteUserBlocked,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['announcementList']});
    },
  });

  if (isLoading) {
    return <div>차단한 유저 목록을 불러오는 중 ...</div>;
  }

  if (error) {
    return <div>차단한 유저 목록을 불러오는 데 실패했습니다.</div>;
  }
  console.log(data);
  const blockedUserList = data?.list || [];
  const ITEMS_PER_PAGE = data.pageSize;
  const totalItemsCount = data.totalElements;

  return (
    <div className='flex flex-col gap-40'>
      {/* 상단 */}
      <BackButtonTitleHeader title='차단한 사용자 목록' between />

      {/* 리스트 */}
      {blockedUserList.length === 0 ? (
        <div className='flex justify-center items-center py-60'>
          <p className='text-gray-2 text-lg'>차단한 사용자가 없습니다.</p>
        </div>
      ) : (
        <ul className='flex flex-col gap-10 px-16'>
          {blockedUserList.map((user: BlockedUserType) => (
            <BlockedUser
              key={user.id}
              user={user}
              unblockClick={() => unblockMutation.mutate(user.id)}
            />
          ))}
        </ul>
      )}

      {/* 페이지네이션 */}
      {blockedUserList.length > 0 && (
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
      )}

      {unblockMutation.isPending && <LoadingOverlay />}

      {unblockMutation.isError && (
        <Modal
          content='차단 해제를 실패했습니다.'
          rightText='확인'
          onRightClick={() => unblockMutation.reset()}
        />
      )}
    </div>
  );
};

export default BlockedUserPage;
