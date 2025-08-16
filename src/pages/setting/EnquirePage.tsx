import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import ChevronRight from '@/assets/arrows/chevron-right.svg?react';
import {enquiryCategories} from '@/constants/enquiry';
import {useRef, useState} from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import {useMutation} from '@tanstack/react-query';
import {postInquiries} from '@/api/mypageApi';
import LoadingOverlay from '@/components/global/LoadingOverlay';
import Modal from '@/components/global/Modal';
import {useNavigate} from 'react-router-dom';
import type {EnquiryCategoryType} from '@/types/enquiry';

const EnquirePage = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [category, setCategory] = useState<EnquiryCategoryType>({
    id: '',
    category: '',
  });
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const enquireMutation = useMutation({
    mutationFn: postInquiries,
  });

  const isFormValid = () => {
    const titleValid = title.trim().length >= 3 && title.trim().length <= 100;
    const categoryValid = category.id.trim().length > 0;
    const contentValid =
      content.trim().length >= 3 && content.trim().length <= 5000;
    return titleValid && categoryValid && contentValid;
  };

  const handleSubmit = () => {
    const data = {title, category: category.id, content};
    enquireMutation.mutate(data);
    console.log(data);
  };

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={3}
            maxLength={100}
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
              <p>{category.category}</p>
              <ChevronRight className='rotate-90 w-30 h-30' />
            </div>
            {openDropdown && (
              <CategoryDropdown
                setCategory={setCategory}
                setOpenDropdown={setOpenDropdown}
              />
            )}
          </div>
        </div>

        {/* 문의 내용 */}
        <div className='flex justify-between items-center gap-14 border-b border-solid border-primary-5 py-16 px-22 self-stretch'>
          <p className='text-[#000] text-xl font-medium leading-[110%]'>
            문의 내용
          </p>
        </div>
        <div className='flex flex-col items-center gap-14 self-stretch'>
          <textarea
            aria-label='enquiry-content'
            name='enquiry-content'
            id='enquiry-content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minLength={3}
            maxLength={5000}
            placeholder='문의 내용을 작성하세요.'
            className='border-b border-solid border-primary-5 py-16 px-22 
            placeholder:text-gray-2 text-[#000] text-[23px] leading-[110%] resize-none w-full h-398 focus:outline-0'
          />

          <button
            type='submit'
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`py-[8.5px] px-28 rounded-[5px] border border-solid text-2xl font-medium leading-[110%] ${
              isFormValid()
                ? 'border-primary bg-white_1 text-primary hover:cursor-pointer'
                : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}>
            등록하기
          </button>
        </div>
      </div>

      {/* 상태 모달 & 오버레이 */}
      {enquireMutation.isPending && <LoadingOverlay />}
      {enquireMutation.isSuccess && (
        <Modal
          content='성공적으로 문의 메일을 보냈습니다.'
          rightText='확인'
          onRightClick={() => navigate(-1)}
        />
      )}
      {enquireMutation.isError && (
        <Modal
          content='문의 메일을 발송 중 오류가 발생했습니다.'
          rightText='확인'
          onRightClick={() => enquireMutation.reset()}
        />
      )}
    </div>
  );
};

const CategoryDropdown = ({
  setCategory,
  setOpenDropdown,
}: {
  setCategory: (category: EnquiryCategoryType) => void;
  setOpenDropdown: (open: boolean) => void;
}) => {
  return (
    <div className='absolute w-full grow flex flex-col py-3 px-7 bg-[#e7e7e7]'>
      {enquiryCategories.map((category) => (
        <p
          key={category.id}
          className='hover:cursor-pointer'
          onClick={() => {
            setCategory(category);
            setOpenDropdown(false);
          }}>
          {category.category}
        </p>
      ))}
    </div>
  );
};

export default EnquirePage;
