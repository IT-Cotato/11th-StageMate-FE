{
  /** 상영 중인 공연 몰아보기 리스트 컴포넌트 - 페이지네이션 */
}

interface PerformanceProps {
  performanceName: string;
  imageUrl: string;
  theaterName: string;
  startDate: string;
  endDate: string;
  url: string;
}
const PerformanceCard = ({
  performanceName,
  imageUrl,
  theaterName,
  startDate,
  endDate,
  url,
}: PerformanceProps) => {
  return (
    <div
      className='
  group sm:w-180 w-110 sm:h-[314px] flex flex-col gap-2 text-center
  rounded-[20px] hover:bg-primary-5 hover:border hover:border-primary
  transition duration-200
'>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        <img
          src={imageUrl}
          alt={performanceName}
          className='sm:w-180 w-110 sm:h-200 object-cover rounded-[20px] p-4'
        />
      </a>
      <p className='font-bold sm:text-[16px] text-[12px] truncate'>
        {performanceName}
      </p>
      <p className='sm:text-[13px] text-[10px]'>
        {startDate} ~ {endDate}
      </p>
      <p className='sm:text-[13px] text-[10px]'>{theaterName}</p>
    </div>
  );
};

export default PerformanceCard;
