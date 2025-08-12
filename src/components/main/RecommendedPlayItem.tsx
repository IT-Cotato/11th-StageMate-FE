import ChevronRight from '@/assets/chevrons/chevron-right.svg?react';

interface RecommendedPlayItemProps {
  title: string;
  imageUrl?: string;
  url?: string;
}

export default function RecommendedPlayItem({
  title,
  imageUrl,
  url,
}: RecommendedPlayItemProps) {
  return (
    <li className='flex flex-col min-w-[130px] sm:min-w-[190px] gap-4 sm:gap-10 shrink-0 sm:last:mr-18 last:mr-10'>
      <div className='relative sm:w-[190px] w-[130px] sm:h-[250px] h-[190px]'>
        <img
          src={imageUrl?.trim()}
          alt={title}
          className='w-full h-full object-cover rounded-[20px]'
        />
        {url && (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='absolute top-10 right-10 flex items-center bg-white/85 rounded-full shadow-md hover:bg-white px-5 sm:py-2'>
            <h2 className='sm:text-[12px] text-[10px] text-primary font-medium'>
              보러가기
            </h2>
            <ChevronRight className='text-primary w-14' />
          </a>
        )}
      </div>
      <h2 className='sm:w-[190px] w-[130px] whitespace-nowrap truncate text-gray-30 font-bold text-[16px] text-center'>
        {title}
      </h2>
    </li>
  );
}
