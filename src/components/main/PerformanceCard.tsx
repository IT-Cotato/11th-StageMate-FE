type BaseProps = {
  performanceName: string;
  imageUrl: string;
  theaterName: string;
  startDate: string;
  endDate: string;
  className?: string;
};

type External = {
  variant: 'external';
  url: string;
};

type Selectable = {
  variant: 'selectable';
  selected?: boolean;
  onSelect: () => void;
};

type PerformanceCardProps = BaseProps & (External | Selectable);

const baseWrapper =
  'group flex flex-col justify-start block sm:w-180 w-110 sm:h-[314px] rounded-[20px] text-center transition duration-200 border border-transparent hover:border-primary hover:bg-primary-5';

const CardContent = ({
  performanceName,
  imageUrl,
  theaterName,
  startDate,
  endDate,
}: BaseProps) => (
  <>
    <div className='p-4'>
      <div className='overflow-hidden rounded-[20px]'>
        <img
          src={imageUrl}
          alt={performanceName}
          className='sm:w-180 w-110 sm:h-200 object-cover block'
        />
      </div>
    </div>
    <div className='flex flex-col gap-2'>
      <p className='font-bold sm:text-[16px] text-[12px] truncate'>
        {performanceName}
      </p>
      <p className='sm:text-[13px] text-[10px]'>
        {startDate} ~ {endDate}
      </p>
      <p className='sm:text-[13px] text-[10px]'>{theaterName}</p>
    </div>
  </>
);

const PerformanceCard = (props: PerformanceCardProps) => {
  const {
    performanceName,
    imageUrl,
    theaterName,
    startDate,
    endDate,
    className,
    variant,
  } = props;

  const baseProps: BaseProps = {
    performanceName,
    imageUrl,
    theaterName,
    startDate,
    endDate,
  };

  const wrapper = `${baseWrapper} ${className ?? ''}`;

  if (variant === 'external') {
    const {url} = props; // External로 안전하게 좁혀짐
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className={wrapper}>
        <CardContent {...baseProps} />
      </a>
    );
  }

  // variant === 'selectable'
  const {selected, onSelect} = props; // Selectable로 좁혀짐
  return (
    <button
      type='button'
      onClick={onSelect}
      aria-pressed={!!selected}
      className={`${wrapper} ${selected ? 'border-primary bg-primary-5' : ''}`}>
      <CardContent {...baseProps} />
    </button>
  );
};

export default PerformanceCard;
