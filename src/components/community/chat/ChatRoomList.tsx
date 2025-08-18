import Users from '@/assets/community/live-chat-users.svg?react';
import ChatRoomItem from './ChatRoomItem';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';
import LoadMoreButton from '@/components/global/LoadMoreButton';
import {useQuery} from '@tanstack/react-query';
import {getChatRoom} from '@/api/chatApi';
import type {ChatRoomType} from '@/types/chat';

const ChatRoomList = () => {
  const {goToChatRoomDetail} = useCommunityNavigation();
  const {goToChatRoomList} = useCommunityListNavigation();

  const {data, isLoading, error} = useQuery({
    queryKey: ['chatRoomList'],
    queryFn: () => getChatRoom({page: 0}),
  });

  if (isLoading) {
    return <div>채팅방 불러오는 중 ...</div>;
  }

  if (error) {
    return <div>채팅방을 불러오는 데 실패했습니다.</div>;
  }

  const chatRoomList = (data?.list || []).slice(0, 3);

  return (
    <div className='flex flex-col gap-15'>
      {/* title */}
      <div className='flex flex-row items-end justify-between'>
        <div className='flex flex-row gap-10 items-center'>
          <Users />
          <h1 className='text-xl font-bold'>실시간 채팅방</h1>
        </div>
        <LoadMoreButton onClick={goToChatRoomList} />
      </div>

      {/** 채팅방 리스트 렌더링 */}
      <div className='flex flex-col gap-10'>
        {chatRoomList.map((room: ChatRoomType) => (
          <ChatRoomItem
            key={room.chatRoomId}
            room={room}
            onClick={() => goToChatRoomDetail(room.chatRoomId)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
