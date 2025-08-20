import ChatRoomItem from '@/components/community/chat/ChatRoomItem';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import Pagination from 'react-js-pagination';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {getChatRoom} from '@/api/chatApi';
import type {ChatRoomType} from '@/types/chat';

const ChatPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {goToChatRoomDetail} = useCommunityNavigation();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const {data, isLoading, error} = useQuery({
    queryKey: ['chatRoomList', currentPage],
    queryFn: () => getChatRoom({page: currentPage - 1}),
  });

  if (isLoading) {
    return <div>채팅방 불러오는 중 ...</div>;
  }

  if (error) {
    return <div>채팅방을 불러오는 데 실패했습니다.</div>;
  }

  const ChatRoomList = data?.list || [];
  const ITEMS_PER_PAGE = data.pageSize;
  const totalItemsCount = data.totalElements;

  return (
    <div className='px-16'>
      {/* 헤더 */}
      <div className='flex justify-between items-center'>
        <h1 className='p-10 text-[#000] text-3xl font-bold leading-[140%]'>
          실시간 채팅방
        </h1>
      </div>

      {/* 채팅방 목록 */}
      <div className='flex flex-col gap-10'>
        {ChatRoomList.map((room: ChatRoomType) => (
          <ChatRoomItem
            key={room.chatRoomId}
            room={room}
            onClick={() => goToChatRoomDetail(room.chatRoomId, room.title)}
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

export default ChatPage;
