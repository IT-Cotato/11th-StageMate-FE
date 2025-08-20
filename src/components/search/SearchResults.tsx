import TicketItem from './TicketItem';
import SearchCommunityItem from './SearchCommunityItem';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import type {SearchResultData} from '@/types/search';
import '@/styles/skeleton.css';

interface SearchResultsProps {
  data: SearchResultData | undefined;
  isLoading: boolean;
  isError: boolean;
}

const SearchResults = ({data, isLoading, isError}: SearchResultsProps) => {
  const scrollRef = useHorizontalScroll();
  if (isError) return <div>검색 결과를 불러오는 중 오류가 발생했습니다.</div>;
  if (isLoading)
    return (
      <div className='flex flex-col gap-30 bg-white'>
        {Array.from({length: 3}).map((_, idx) => (
          <div
            key={idx}
            className='rounded-[10px] h-70 w-full skeleton-shimmer'
          />
        ))}
      </div>
    );

  if (!data || (data.performances.length === 0 && data.community.length === 0))
    return (
      <div className='flex justify-center text-gray-2'>
        검색 결과가 없습니다.
      </div>
    );

  return (
    <div className='flex flex-col gap-30'>
      {/** 티켓/공연 */}
      {data.performances && data.performances.length > 0 && (
        <div className='flex flex-col gap-10'>
          <div className='flex flex-row justify-between items-center'>
            <span className='font-bold text-xl text-primary ml-5'>
              티켓 ({data.performances.length})
            </span>
          </div>
          <ul
            className='overflow-x-auto flex gap-10 w-max bg-white'
            ref={scrollRef}>
            {data?.performances.map((ticket) => (
              <TicketItem
                key={ticket.chatRoomId || ticket.performanceName}
                performanceName={ticket.performanceName}
                startDate={ticket.startDate}
                endDate={ticket.endDate}
                imgUrl={ticket.imageUrl}
                theaterName={ticket.theaterName}
                url={ticket.url}
                chatRoomId={ticket.chatRoomId ?? null}
              />
            ))}
          </ul>
        </div>
      )}

      {/** 커뮤니티 */}
      {data.community && data.community.length > 0 && (
        <div className='flex flex-col gap-10'>
          <span className='font-bold text-xl text-primary ml-5'>
            커뮤니티 ({data.community.length})
          </span>
          {data?.community.map((post) => (
            <SearchCommunityItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
