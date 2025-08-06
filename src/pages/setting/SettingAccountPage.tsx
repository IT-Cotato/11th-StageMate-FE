// 임시 계정 정보
const accountInfo = {
  id: '아이디',
  email: '이메일',
  name: '이름',
  nickname: '닉네임',
  birth: '생년월일',
};

const SettingAccountPage = () => {
  return (
    <div className='flex flex-col gap-29'>
      {/* info */}
      <div className='mx-28 py-37 px-33 flex flex-col gap-26 bg-[#d9d9d9]'>
        <div className='border-b border-solid border-[#000]'>
          <p>{accountInfo.id || '아이디'}</p>
        </div>
        <div className='border-b border-solid border-[#000]'>
          <p>{accountInfo.email || '이메일'}</p>
        </div>
        <div className='border-b border-solid border-[#000]'>
          <p>{accountInfo.name || '이름'}</p>
        </div>
        <div className='border-b border-solid border-[#000]'>
          <p>{accountInfo.nickname || '닉네임'}</p>
        </div>
        <div className='border-b border-solid border-[#000]'>
          <p>{accountInfo.birth || '생년월일'}</p>
        </div>
      </div>

      {/* change pw */}
      <div className='flex justify-end'>
        <button className='py-4 px-10 border border-solid border-primary bg-white_1 text-[15px] leading-[140%] text-primary'>
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default SettingAccountPage;
