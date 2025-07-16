import {useState} from 'react';
import PageHeader from '@/components/global/PageHeader';
import MainLogo from '@/assets/logos/main-logo.svg?react';
import ButtonStroke from '@/components/global/ButtonStroke';
import ButtonFill from '@/components/global/ButtonFill';
import BrandBadges from '@/components/auth/BrandBadges';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [isStayingLoggedIn, setIsStayingLoggedIn] = useState(false);

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white'>
      {/* 헤더 */}
      <PageHeader
        title={'로그인'}
        onLeftClick={() => navigate('/')}
        onRightClick={() => navigate('/')}
      />

      <div className='pt-32 px-16 flex flex-col items-center gap-20'>
        {/* content */}
        <div className='flex flex-col items-start gap-40 self-stretch'>
          <div className='flex px-20 flex-col items-start gap-15'>
            <h1 className='self-stretch text-[#141313] text-[32px] font-bold leading-[140%]'>
              공연의 시작은 여기서부터,
            </h1>
            <MainLogo />
          </div>

          <div className='flex flex-col items-start gap-20 self-stretch'>
            <input
              type='text'
              placeholder='ID'
              className='flex h-60 py-16 px-17 items-center gap-10 self-stretch bg-gray-1 placeholder:text-[#918F9D] placeholder:text-xl placeholder:leading-[140%]'
            />
            <input
              type='password'
              placeholder='PW'
              className='flex h-60 py-16 px-17 items-center gap-10 self-stretch bg-gray-1 placeholder:text-[#918F9D] placeholder:text-xl placeholder:leading-[140%]'
            />
          </div>

          <CustomCheckbox
            checked={isStayingLoggedIn}
            onChange={setIsStayingLoggedIn}>
            <p className='text-gray3 font-roboto leading-[140%] select-none'>
              로그인 유지
            </p>
          </CustomCheckbox>

          <div className='w-full flex flex-col items-start gap-16 self-stretch'>
            <ButtonFill
              text='로그인'
              // todo : 로그인 api 연동
              onClick={() => console.log('로그인 버튼 클릭')}
            />
            <ButtonStroke
              text='회원가입'
              onClick={() => navigate('/signup-condition')}
            />
          </div>
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
  );
};

export default LoginPage;
