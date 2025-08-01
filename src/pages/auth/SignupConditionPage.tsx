import BrandBadges from '@/components/auth/BrandBadges';
import ButtonFill from '@/components/global/ButtonFill';
import ButtonStroke from '@/components/global/ButtonStroke';
import PageHeader from '@/components/global/PageHeader';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import {TermOfService} from '@/constant';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface CheckingState {
  [key: `allowCondition${number}`]: boolean;
  allowSMS: boolean;
  allowEmail: boolean;
}

const SignupConditionPage = () => {
  const navigate = useNavigate();

  const [checking, setChecking] = useState<CheckingState>({
    allowCondition1: false,
    allowCondition2: false,
    allowCondition3: false,
    allowSMS: false,
    allowEmail: false,
  });

  const handleNextClick = () => {
    if (
      checking.allowCondition1 &&
      checking.allowCondition2 &&
      checking.allowCondition3
    ) {
      navigate('/signup-form');
    } else {
      alert(
        '필수 약관에 동의하지 않으면 해당 서비스 이용이 제한될 수 있습니다. '
      );
    }
  };

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white'>
      <PageHeader
        title='회원가입'
        onLeftClick={() => navigate('/login')}
        onRightClick={() => navigate('/')}
        className='pt-23'
      />

      <div className='pt-40 px-16 flex flex-col items-start gap-62 self-stretch'>
        <h1 className='text-[#141313] text-[32px] font-bold leading-[140%]'>
          회원가입
        </h1>

        <div className='flex flex-col self-stretch items-center gap-46'>
          {/* 약관 */}
          <div className='flex flex-col self-stretch items-start py-20 px-15 gap-5'>
            {TermOfService.map((term, index) => (
              <AccordionItem
                key={index}
                checked={checking[`allowCondition${index + 1}`]}
                title={term.title}
                onChange={() =>
                  setChecking((prev) => ({
                    ...prev,
                    [`allowCondition${index + 1}`]:
                      !prev[`allowCondition${index + 1}`],
                  }))
                }>
                <div className='flex pl-10 pr-47 pb-12 items-start gap-10'>
                  <p className='shrink-0 text-lg font-medium leading-22 font-lato break-words whitespace-pre-line w-full'>
                    {term.content}
                  </p>
                </div>
              </AccordionItem>
            ))}

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
                  checking.allowCondition1 &&
                  checking.allowCondition2 &&
                  checking.allowCondition3 &&
                  checking.allowSMS &&
                  checking.allowEmail
                }
                onChange={() => {
                  const allChecked =
                    checking.allowCondition1 &&
                    checking.allowCondition2 &&
                    checking.allowCondition3 &&
                    checking.allowSMS &&
                    checking.allowEmail;
                  setChecking({
                    allowCondition1: !allChecked,
                    allowCondition2: !allChecked,
                    allowCondition3: !allChecked,
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
            <ButtonFill text='다음' onClick={handleNextClick} />
            <ButtonStroke text='취소' onClick={() => navigate('/login')} />
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

export default SignupConditionPage;
