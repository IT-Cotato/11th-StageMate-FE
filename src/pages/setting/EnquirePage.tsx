import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import ChevronRight from '@/assets/arrows/chevron-right.svg?react';
import {enquiryCategories} from '@/constants/enquiry';
import {useRef, useState} from 'react';
import useClickOutside from '@/hooks/useClickOutside';

const EnquirePage = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    onClickOutside: () => setOpenDropdown(false),
  });

  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title='1:1 문의하기' borderBottom />

      {/* content */}
      <div className='px-20 flex flex-col items-center self-stretch'>
        {/* 제목 */}
        <div className='flex justify-between items-center gap-14 border-b border-solid border-primary-5 py-16 px-22 self-stretch'>
          <p className='text-[#000] text-xl font-medium leading-[110%]'>제목</p>
          <input
            type='text'
            className='h-25 max-w-436 grow border border-solid border-[#000] focus:outline-0 text-[#000] text-xl leading-[110%]'
          />
        </div>

        {/* 카테고리 */}
        <div className='flex justify-between items-center gap-14 border-b border-solid border-primary-5 py-16 px-22 self-stretch'>
          <p className='text-[#000] text-xl font-medium leading-[110%]'>
            카테고리
          </p>
          <div ref={dropdownRef} className='relative max-w-436 grow'>
            <div
              className='h-25 border border-solid border-[#000] focus:outline-0 text-[#000] text-xl leading-[110%] flex justify-between items-center overflow-hidden'
              onClick={() => setOpenDropdown((prev) => !prev)}>
              <p>선택된 내용</p>
              <ChevronRight className='rotate-90 w-30 h-30' />
            </div>
            {openDropdown && <CategoryDropdown />}
          </div>
        </div>

        {/* 문의 내용 */}
        <div className='flex justify-between items-center gap-14 border-b border-solid border-primary-5 py-16 px-22 self-stretch'>
          <p className='text-[#000] text-xl font-medium leading-[110%]'>
            문의 내용
          </p>
        </div>
        <form
          className='flex flex-col items-center gap-14 self-stretch'
          onSubmit={(e) => {
            e.preventDefault();
            console.log('ok');
          }}>
          <textarea
            name='enquiry-content'
            id='enquiry-content'
            placeholder='문의 내용을 작성하세요.'
            className='border-b border-solid border-primary-5 py-16 px-22 
            placeholder:text-gray-2 text-[#000] text-[23px] leading-[110%] resize-none w-full h-398 focus:outline-0'
          />

          <button
            type='submit'
            className='py-[8.5px] px-28 rounded-[5px] border border-solid border-primary bg-white_1 text-primary text-2xl font-medium leading-[110%]'>
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

const CategoryDropdown = () => {
  return (
    <div className='absolute w-full grow flex flex-col py-3 px-7 bg-[#e7e7e7]'>
      {enquiryCategories.map((category) => (
        <p key={category.id} className='hover:cursor-pointer'>
          {category.category}
        </p>
      ))}
    </div>
  );
};

export default EnquirePage;
