import ChatRoomItem from '@/components/community/chat/ChatRoomItem';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import {mockChatRooms} from '@/mocks/mockChatRooms';
import Search from '@/assets/search.svg?react';

const ChatPage = () => {
  const {goToChatRoomDetail} = useCommunityNavigation();

  return (
    <div className='px-16'>
      {/* 헤더 */}
      <div className='flex justify-between items-center'>
        <h1 className='p-10 text-[#000] text-3xl font-bold leading-[140%]'>
          실시간 채팅방
        </h1>
        <Search
          className='w-35 h-35 hover:cursor-pointer'
          onClick={() => console.log('todo : 실시간 채팅방 검색 클릭')}
        />
      </div>

      {/* 채팅방 목록 */}
      <div className='flex flex-col gap-10'>
        {mockChatRooms.map((room) => (
          <ChatRoomItem
            key={room.id}
            room={room}
            onClick={() => goToChatRoomDetail(room.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
