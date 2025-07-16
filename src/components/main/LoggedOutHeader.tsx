import MainButton from './MainButton';

const LoggedOutHeader = () => {
  return (
    <div>
      <h1 className='flex text-[20px] text-white font-bold mt-[6px] mb-[18px]'>
        StageMate에 오신 것을 환영합니다!
      </h1>
      <MainButton text='로그인하기' fullWidth />
      <MainButton text='회원가입하기' fullWidth />
    </div>
  );
};

export default LoggedOutHeader;
