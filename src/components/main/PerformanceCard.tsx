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
    <div className='w-180 h-[314px] flex flex-col gap-2 text-center'>
      {/** 이미지 클릭 시 예매 url 링크 연동 */}
      <a href={url} target='_blank' rel='noopener noreferrer'>
        <img
          src={imageUrl}
          alt={performanceName}
          className='w-180 h-200 object-cover rounded-[20px] hover:opacity-80 transition-opacity duration-200'
        />
      </a>
      <p className='font-bold text-[16px] truncate'>{performanceName}</p>
      <p className='text-[13px]'>
        {startDate} ~ {endDate}
      </p>
      <p className='text-[13px]'>{theaterName}</p>
    </div>
  );
};

export default PerformanceCard;
