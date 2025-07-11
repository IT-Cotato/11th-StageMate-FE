import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import HomeOutline from '@/assets/bottomNavigationBar/home-outline.svg?react';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({title}: PageHeaderProps) => {
  return (
    <div className='flex py-18 pr-19 pl-18 justify-center items-center shrink-0 bg-white'>
      <div className='flex justify-between h-50 items-center'>
        <ChevronLeft className='w-50 h-50 aspect-square' />
        <p className='text-[#141313] text-2xl leading-[140%]'>{title}</p>
        <div className='flex justify-center items-center w-50 h-50 py-12 pr-[11.9px] pl-[10.3px]'>
          <HomeOutline className='w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
