import Wifi from '@/assets/community/live-chat-wifi.svg?react';
import Door from '@/assets/community/live-chat-door.svg?react';
import type {ChatRoomType} from '@/types/chat';

interface ChatRoomItemProps {
  room: ChatRoomType;
  onClick?: () => void;
}
const ChatRoomItem = ({room, onClick}: ChatRoomItemProps) => {
  console.log(room);
  return (
    <li className='flex px-14 py-9 bg-[#ffffff] items-center rounded-[10px] text-sm'>
      <Wifi className='mr-32 w-20' />
      <div className='flex flex-col w-full'>
        <div className='line-clamp-1'>{room.title}</div>
        <div className='line-clamp-1'>
          오픈 시간: {room.startDate} ~ {room.endDate}
        </div>
      </div>
      <Door className='w-20 ml-11 cursor-pointer' onClick={onClick} />
    </li>
  );
};

export default ChatRoomItem;
