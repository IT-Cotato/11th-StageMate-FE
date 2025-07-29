import Wifi from '@/assets/community/live-chat-wifi.svg?react';
import Door from '@/assets/community/live-chat-door.svg?react';
import type {ChatRoom} from '@/types/community';

interface ChatRoomItemProps {
  room: ChatRoom;
  onClick?: () => void;
}
const ChatRoomItem = ({room, onClick}: ChatRoomItemProps) => {
  return (
    <li className='flex w-full px-14 py-9 h-48 bg-[#ffffff] items-center'>
      <Wifi className='mr-32' />
      <div className='flex flex-row flex-1 justify-between cursor-pointer'>
        <div>{room.title}</div>
        <div>
          오픈 시간: {room.startTime} ~ {room.endTime}
        </div>
      </div>
      <Door className='ml-11 cursor-pointer' onClick={onClick} />
    </li>
  );
};

export default ChatRoomItem;
