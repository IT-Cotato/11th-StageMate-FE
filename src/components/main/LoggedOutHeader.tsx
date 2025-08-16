import MainButton from './MainButton';
import {useNavigate} from 'react-router-dom';

const LoggedOutHeader = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='flex sm:text-[20px] text-[18px] text-white font-bold mt-[6px] mb-[18px]'>
        StageMate에 오신 것을 환영합니다!
      </h1>
      <MainButton
        onClick={() => navigate('/login')}
        text='로그인하기'
        fullWidth
      />
      <MainButton
        onClick={() => navigate('/signup-condition')}
        text='회원가입하기'
        fullWidth
      />
    </div>
  );
};

export default LoggedOutHeader;
