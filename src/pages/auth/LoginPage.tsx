import {useState} from 'react';
import PageHeader from '@/components/global/PageHeader';
import MainLogo from '@/assets/logos/main-logo.svg?react';
import ButtonStroke from '@/components/global/ButtonStroke';
import ButtonFill from '@/components/global/ButtonFill';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import {useNavigate} from 'react-router-dom';
import AuthBrandBadges from '@/components/auth/AuthBrandBadges';
import {postLogin} from '@/api/authApi';
import {useMutation} from '@tanstack/react-query';
import {useAuthStore} from '@/stores/authStore';
import {getMypageInfo} from '@/api/mypageApi';

const LoginPage = () => {
  const navigate = useNavigate();
  const {login} = useAuthStore();

  const [isStayingLoggedIn, setIsStayingLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const loginMutation = useMutation({
    mutationFn: async () => {
      const loginRes = await postLogin({userId: id, password: pw});

      const mypageRes = await getMypageInfo();
      const userInfo = mypageRes.data;

      login(loginRes.accessToken, loginRes.refreshToken, userInfo);
      navigate('/');
    },
    onError: (error) => alert(error.message),
  });

  const handleLoginClick = () => {
    loginMutation.mutate();
  };

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white'>
      {/* 헤더 */}
      <PageHeader
        title={'로그인'}
        onLeftClick={() => navigate('/')}
        onRightClick={() => navigate('/')}
        className='pt-23'
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
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder='ID'
              className='flex h-60 py-16 px-17 items-center gap-10 self-stretch bg-gray-1 placeholder:text-[#918F9D] placeholder:text-xl placeholder:leading-[140%] focus:outline-0'
            />
            <input
              type='password'
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder='PW'
              className='flex h-60 py-16 px-17 items-center gap-10 self-stretch bg-gray-1 placeholder:text-[#918F9D] placeholder:text-xl placeholder:leading-[140%] focus:outline-0'
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
            <ButtonFill text='로그인' onClick={handleLoginClick} />
            <ButtonStroke
              text='회원가입'
              onClick={() => navigate('/signup-condition')}
            />
          </div>
        </div>

        {/* brands */}
        <AuthBrandBadges />
      </div>
    </div>
  );
};

export default LoginPage;
