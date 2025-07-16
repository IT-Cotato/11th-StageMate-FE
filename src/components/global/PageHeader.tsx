import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import HomeOutline from '@/assets/bottomNavigationBar/home-outline.svg?react';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({title}: PageHeaderProps) => {
  return (
    <div className='flex flex-col pt-23 pr-10 pl-6 justify-end items-center shrink-0 bg-white gap-20'>
      <div className='flex w-full justify-between items-center h-40'>
        <ChevronLeft
          onClick={() => console.log('PageHeader 왼쪽 화살표 클릭')}
          className='w-40 h-40 aspect-square'
        />
        <p className='text-[#141313] text-2xl leading-[140%]'>{title}</p>
        <div className='flex justify-center items-center w-40 h-40 py-[9.6px] pl-[8.23px] pr-[9.48px]'>
          <HomeOutline
            onClick={() => console.log('PageHeader 오른쪽 홈버튼 클릭')}
            className='w-full h-full'
          />
        </div>
      </div>
      <div
        className='w-full h-3 shrink-0 
        bg-linear-[90deg,var(--color-white)_0%,var(--color-primary-2)_31.73%,var(--color-primary-2)_75.48%,var(--color-white)_100%]'
      />
    </div>
  );
};

export default PageHeader;
