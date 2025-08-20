import {getTempUserKey, postAgree} from '@/api/authApi';
import AuthBrandBadges from '@/components/auth/AuthBrandBadges';
import ButtonFill from '@/components/global/ButtonFill';
import ButtonStroke from '@/components/global/ButtonStroke';
import PageHeader from '@/components/global/PageHeader';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import {TermOfService} from '@/constant';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface CheckingState {
  serviceTerms: boolean;
  privacyPolicy: boolean;
  marketing: boolean;
  smsNotification: boolean;
  emailNotification: boolean;
}

const SignupConditionPage = () => {
  const navigate = useNavigate();

  const [checking, setChecking] = useState<CheckingState>({
    serviceTerms: false,
    privacyPolicy: false,
    marketing: false,
    smsNotification: false,
    emailNotification: false,
  });

  const handleNextClick = async () => {
    try {
      // 1. 임시 사용자 키 가져오기
      await getTempUserKey();

      // 2. 사용자가 동의한 약관 정보 전송하기
      const agreementResult = await postAgree(
        checking.serviceTerms,
        checking.privacyPolicy,
        checking.marketing,
        checking.smsNotification,
        checking.emailNotification
      );

      // 3. 두 단계 모두 성공적으로 완료되었을 때
      console.log('동의 완료:', agreementResult);
      navigate('/signup-form');
    } catch (error) {
      console.error('약관 동의 처리 중 오류가 발생했습니다:', error);
      alert('서비스 이용에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white min-h-screen shadow-2xl'>
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
            <AccordionItem
              key={TermOfService[0].id}
              checked={checking.serviceTerms}
              title={TermOfService[0].title}
              onChange={() =>
                setChecking((prev) => ({
                  ...prev,
                  serviceTerms: !prev.serviceTerms,
                }))
              }>
              <div className='flex pl-10 pr-47 pb-12 items-start gap-10'>
                <p className='shrink-0 text-lg font-medium leading-22 font-lato break-words whitespace-pre-line w-full'>
                  {TermOfService[0].content}
                </p>
              </div>
            </AccordionItem>
            <AccordionItem
              key={TermOfService[1].id}
              checked={checking.privacyPolicy}
              title={TermOfService[1].title}
              onChange={() =>
                setChecking((prev) => ({
                  ...prev,
                  privacyPolicy: !prev.privacyPolicy,
                }))
              }>
              <div className='flex pl-10 pr-47 pb-12 items-start gap-10'>
                <p className='shrink-0 text-lg font-medium leading-22 font-lato break-words whitespace-pre-line w-full'>
                  {TermOfService[1].content}
                </p>
              </div>
            </AccordionItem>
            <AccordionItem
              key={TermOfService[2].id}
              checked={checking.marketing}
              title={TermOfService[2].title}
              onChange={() =>
                setChecking((prev) => ({
                  ...prev,
                  marketing: !prev.marketing,
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
                checked={checking.smsNotification}
                onChange={() =>
                  setChecking((prev) => ({
                    ...prev,
                    smsNotification: !prev.smsNotification,
                  }))
                }>
                <p className='text-[22px] leading-[140%] text-[#141313] select-none'>
                  SMS 수신동의
                </p>
              </CustomCheckbox>
              <CustomCheckbox
                checked={checking.emailNotification}
                onChange={() =>
                  setChecking((prev) => ({
                    ...prev,
                    emailNotification: !prev.emailNotification,
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
                  checking.serviceTerms &&
                  checking.privacyPolicy &&
                  checking.marketing &&
                  checking.smsNotification &&
                  checking.emailNotification
                }
                onChange={() => {
                  const allChecked =
                    checking.serviceTerms &&
                    checking.privacyPolicy &&
                    checking.marketing &&
                    checking.smsNotification &&
                    checking.emailNotification;
                  setChecking({
                    serviceTerms: !allChecked,
                    privacyPolicy: !allChecked,
                    marketing: !allChecked,
                    smsNotification: !allChecked,
                    emailNotification: !allChecked,
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
          <AuthBrandBadges />
        </div>
      </div>
    </div>
  );
};

export default SignupConditionPage;
