import {mockTickets} from '@/mocks/mockTickets';
import {useState} from 'react';
import TicketItem from './TicketItem';
import {mockPosts} from '@/mocks/mockPosts';
import ChatRoomItem from '../community/chat/ChatRoomItem';
import {mockChatRooms} from '@/mocks/mockChatRooms';
import SearchCommunityItem from './SearchCommunityItem';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';

const SearchResults = () => {
  const [ticketOrder, setTicketOrder] = useState<'정확도 순' | '공연 임박순'>(
    '정확도 순'
  );
  const scrollRef = useHorizontalScroll();
  const sortedTickets = [...mockTickets].sort((a, b) => {
    if (ticketOrder === '정확도 순') {
      return b.accuracyScore - a.accuracyScore;
    } else {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
  });
  return (
    <div className='flex flex-col gap-30'>
      {/** 티켓 */}
      <div className='flex flex-col gap-10'>
        <div className='flex flex-row justify-between items-center'>
          <span className='font-bold text-xl text-primary'>
            티켓 ({mockTickets.length})
          </span>
          <div className='flex flex-row text-[16px] text-gray-2 gap-5 cursor-pointer'>
            <span
              className={ticketOrder === '정확도 순' ? 'font-bold' : ''}
              onClick={() => setTicketOrder('정확도 순')}>
              정확도 순
            </span>
            <span>|</span>
            <span
              className={ticketOrder === '공연 임박순' ? 'font-bold' : ''}
              onClick={() => setTicketOrder('공연 임박순')}>
              공연 임박순
            </span>
          </div>
        </div>
        <ul className='overflow-x-auto' ref={scrollRef}>
          <div className='flex flex-row gap-10 w-max'>
            {sortedTickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                title={ticket.title}
                startDate={ticket.startDate}
                endDate={ticket.endDate}
                imgUrl={ticket.imgUrl}
                theaterName={ticket.theaterName}
              />
            ))}
          </div>
        </ul>
      </div>

      <div className='flex flex-col gap-10'>
        <span className='font-bold text-xl text-primary'>
          커뮤니티 ({mockPosts.length})
        </span>
        {mockPosts.map((post) => (
          <SearchCommunityItem key={post.id} post={post} />
        ))}
      </div>

      <div className='flex flex-col gap-10 mb-60'>
        <span className='font-bold text-xl text-primary'>
          채팅방 ({mockChatRooms.length})
        </span>
        {mockChatRooms.map((room) => (
          <ChatRoomItem key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
