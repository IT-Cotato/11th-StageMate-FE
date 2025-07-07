import MainButton from './MainButton';

export default function LoggedOutHeader() {
  return (
    <div>
      <h1 className='text-[28px] text-white font-bold mt-[19px] mb-[19px]'>
        StageMate에 오신 것을 환영합니다!
      </h1>
      <MainButton text='로그인하기' fullWidth />
      <MainButton text='회원가입하기' fullWidth />
    </div>
  );
}
