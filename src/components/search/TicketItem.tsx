interface TicketItemProps {
  title: string;
  startDate: string;
  endDate: string;
  imgUrl: string;
  theaterName: string;
}

const TicketItem = ({
  title,
  startDate,
  endDate,
  imgUrl,
  theaterName,
}: TicketItemProps) => {
  return (
    <div className='bg-[#fff] rounded-[20px] w-[187px] h-[350px] flex flex-col p-20 items-center gap-15'>
      <span className='font-semibold text-[12px]'>{title}</span>
      <span className='text-[12px]'>
        {startDate} ~ {endDate}
      </span>
      <span className='text-[12px]'>장소: {theaterName}</span>
      <img src={imgUrl} className='w-150 h-170'></img>
      <button className='h-30 bg-primary text-white w-full rounded-[10px] text-[14px] cursor-pointer'>
        예매처 이동하기
      </button>
    </div>
  );
};

export default TicketItem;
