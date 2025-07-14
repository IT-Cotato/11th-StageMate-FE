import BrandBadges from '@/components/auth/BrandBadges';
import ButtonFill from '@/components/global/ButtonFill';
import ButtonStroke from '@/components/global/ButtonStroke';
import PageHeader from '@/components/global/PageHeader';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import {TermOfService} from '@/constant';
import {useState} from 'react';

const SignupCoditionPage = () => {
  const [checking, setChecking] = useState({
    allowCodition01: false,
    allowCodition02: false,
    allowCodition03: false,
    allowSMS: false,
    allowEmail: false,
  });

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white'>
      <PageHeader title='회원가입' />

      <div className='pt-40 px-16 flex flex-col items-start gap-62 self-stretch'>
        <h1 className='text-[#141313] text-[32px] font-bold leading-[140%]'>
          회원가입
        </h1>

        <div className='flex flex-col self-stretch items-center gap-46'>
          {/* 약관 */}
          <div className='flex flex-col self-stretch items-start py-20 px-15 gap-5'>
            <AccordionItem
              checked={checking.allowCodition01}
              title={TermOfService[0].title}
              onChange={() =>
                setChecking((prev) => ({
                  ...prev,
                  allowCodition01: !prev.allowCodition01,
                }))
              }>
              <div className='flex pl-10 pr-47 pb-12 items-start gap-10'>
                <p className='shrink-0 text-lg font-medium leading-22 font-lato break-words whitespace-pre-line w-full'>
                  {TermOfService[0].content}
                </p>
              </div>
            </AccordionItem>
            <AccordionItem
              checked={checking.allowCodition02}
              title={TermOfService[1].title}
              onChange={() =>
                setChecking((prev) => ({
                  ...prev,
                  allowCodition02: !prev.allowCodition02,
                }))
              }>
              <div className='flex pl-10 pr-47 pb-12 items-start gap-10'>
                <p className='shrink-0 text-lg font-medium leading-22 font-lato break-words whitespace-pre-line w-full'>
                  {TermOfService[1].content}
                </p>
              </div>
            </AccordionItem>
            <AccordionItem
              checked={checking.allowCodition03}
              title={TermOfService[2].title}
              onChange={() =>
                setChecking((prev) => ({
                  ...prev,
                  allowCodition03: !prev.allowCodition03,
                }))
              }>
              <div className='flex pl-10 pr-47 pb-12 items-start gap-10'>
                <p className='shrink-0 text-lg font-medium leading-22 font-lato break-words whitespace-pre-line w-full'>
                  {TermOfService[2].content}
                </p>
              </div>
            </AccordionItem>

            <div className='flex pt-10 pb-20 px-10 gap-20'>
              <CustomCheckbox
                checked={checking.allowSMS}
                onChange={() =>
                  setChecking((prev) => ({...prev, allowSMS: !prev.allowSMS}))
                }>
                <p className='text-[22px] leading-[140%] text-[#141313] select-none'>
                  SMS 수신동의
                </p>
              </CustomCheckbox>
              <CustomCheckbox
                checked={checking.allowEmail}
                onChange={() =>
                  setChecking((prev) => ({
                    ...prev,
                    allowEmail: !prev.allowEmail,
                  }))
                }>
                <p className='text-[22px] leading-[140%] text-[#141313] select-none'>
                  이메일 수신동의
                </p>
              </CustomCheckbox>
            </div>

            <div className='flex pt-10 pb-20 px-10 gap-20'>
              <CustomCheckbox
                checked={
                  checking.allowCodition01 &&
                  checking.allowCodition02 &&
                  checking.allowCodition03 &&
                  checking.allowSMS &&
                  checking.allowEmail
                }
                onChange={() => {
                  const allChecked =
                    checking.allowCodition01 &&
                    checking.allowCodition02 &&
                    checking.allowCodition03 &&
                    checking.allowSMS &&
                    checking.allowEmail;
                  setChecking({
                    allowCodition01: !allChecked,
                    allowCodition02: !allChecked,
                    allowCodition03: !allChecked,
                    allowSMS: !allChecked,
                    allowEmail: !allChecked,
                  });
                }}>
                <p className='text-[22px] leading-[140%] text-[#141313] select-none'>
                  <span>전체동의</span>
                  <br />
                  <span>
                    이용약관 및 개인정보 수집 및 이용에 모두 동의합니다.
                  </span>
                </p>
              </CustomCheckbox>
            </div>
          </div>

          {/* 다음/취소 버튼 */}
          <div className='flex py-20 gap-20 items-center self-stretch'>
            <ButtonFill
              text='다음'
              onClick={() => console.log('다음 버튼 클릭')}
            />
            <ButtonStroke
              text='취소'
              onClick={() => console.log('취소 버튼 클릭')}
            />
          </div>

          {/* brands */}
          <BrandBadges
            onFacebookClick={() => console.log('facebook 버튼 클릭')}
            onGoogleFuncClick={() => console.log('google 버튼 클릭')}
            onTwitterFuncClick={() => console.log('twitter 버튼 클릭')}
            onAppleFuncClick={() => console.log('apple 버튼 클릭')}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupCoditionPage;
