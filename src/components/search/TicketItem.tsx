import useCommunityNavigation from '@/hooks/useCommunityNavigation';

interface TicketItemProps {
  performanceName: string;
  startDate: string;
  endDate: string;
  imgUrl: string;
  theaterName: string;
  url: string;
  chatRoomId: number | null;
}

const TicketItem = ({
  performanceName,
  startDate,
  endDate,
  imgUrl,
  theaterName,
  url,
  chatRoomId,
}: TicketItemProps) => {
  const {goToChatRoomDetail} = useCommunityNavigation();
  const handleGoToBooking = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <div className='bg-[#fff] rounded-[20px] w-[220px] h-[380px] flex flex-col p-20 items-center gap-15'>
      <span className='font-semibold text-[14px] w-190 truncate text-center'>
        {performanceName}
      </span>
      <span className='text-[12px]'>
        {startDate} ~ {endDate}
      </span>
      <span className='text-[12px] w-190 truncate text-center'>
        장소: {theaterName}
      </span>
      <img src={imgUrl} className='w-140 h-200' alt={performanceName}></img>
      <div className='flex flex-row gap-15 w-170'>
        <button
          className='h-30 bg-primary text-white w-full rounded-[10px] text-[11px] cursor-pointer hover:bg-primary/90'
          onClick={handleGoToBooking}>
          예매처로 이동
        </button>
        {chatRoomId && (
          <button
            className='h-30 bg-primary text-white w-full rounded-[10px] text-[11px] cursor-pointer hover:bg-primary/90'
            onClick={() => goToChatRoomDetail(chatRoomId, performanceName)}>
            채팅방으로 이동
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
