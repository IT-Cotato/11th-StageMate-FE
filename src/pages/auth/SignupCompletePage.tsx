import PageHeader from '@/components/global/PageHeader';
import LogoText from '@/assets/logos/logo-text.svg?react';
import LogoImageShadow from '@/assets/logos/logo-image-shadow.svg?react';
import ButtonFill from '@/components/global/ButtonFill';
import {useNavigate} from 'react-router-dom';

const SignupCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white'>
      <PageHeader
        title='회원가입'
        onLeftClick={() => navigate('/signup-form')}
        onRightClick={() => navigate('/')}
        className='pt-23'
      />

      <div className='flex flex-col gap-64 pt-40 pl-16 pr-17'>
        <div className='flex flex-col px-20'>
          <h1 className='h-50 self-stretch text-[#141313] text-[32px] font-bold leading-[140%]'>
            {/* todo : 회원가입시 사용자 이름으로 수정 */}
            @@님, 새 회원이 되신 것을 축하합니다!
          </h1>
          <h1 className='flex items-end gap-23 self-stretch text-[#141313] text-[32px] font-bold leading-[140%]'>
            <LogoText />와 즐거운 공연 되세요.
          </h1>
        </div>

        <div className='flex flex-col items-center gap-64 self-stretch'>
          <LogoImageShadow />
          <ButtonFill
            text='홈으로'
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupCompletePage;
