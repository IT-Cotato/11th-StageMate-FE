import Users from '@/assets/community/live-chat-users.svg?react';
import {mockChatRooms} from '@/mocks/mockChatRooms';
import LoadMoreButton from '../common/LoadMoreButton';
import ChatRoomItem from './ChatRoomItem';
const ChatRoomList = () => {
  return (
    <div className='flex flex-col gap-10'>
      {/** title */}
      <div className='flex flex-row gap-6 items-center'>
        <Users />
        <h1 className='text-xl font-bold '>실시간 채팅방</h1>
      </div>
      {/** 채팅방 리스트 렌더링 */}
      {mockChatRooms.map((room) => (
        <ChatRoomItem key={room.id} room={room} />
      ))}
      <LoadMoreButton
        onClick={() => console.log('채팅방 리스트 페이지로 연결')}
      />
    </div>
  );
};

export default ChatRoomList;
