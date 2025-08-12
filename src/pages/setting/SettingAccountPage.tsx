import {useNavigate} from 'react-router-dom';

// 임시 계정 정보
const accountInfo = {
  id: '아이디',
  email: '이메일',
  name: '이름',
  nickname: '닉네임',
  birth: '생년월일',
};

const SettingAccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-29'>
      {/* info */}
      <div className='mx-28 py-37 px-33 flex flex-col gap-26 bg-[#d9d9d9] rounded-[10px]'>
        <div className='border-b border-solid border-[#000] flex items-center gap-12'>
          <p className='text-[#000] text-lg font-semibold leading-[140%]'>
            아이디
          </p>
          <p className='text-[#000] text-lg leading-[140%]'>
            {accountInfo.id || '아이디'}
          </p>
        </div>
        <div className='border-b border-solid border-[#000] flex items-center gap-12'>
          <p className='text-[#000] text-lg font-semibold leading-[140%]'>
            이메일
          </p>
          <p className='text-[#000] text-lg leading-[140%]'>
            {accountInfo.email || '이메일'}
          </p>
        </div>
        <div className='border-b border-solid border-[#000] flex items-center gap-12'>
          <p className='text-[#000] text-lg font-semibold leading-[140%]'>
            이름
          </p>
          <p className='text-[#000] text-lg leading-[140%]'>
            {accountInfo.name || '이름'}
          </p>
        </div>
        <div className='border-b border-solid border-[#000] flex items-center gap-12'>
          <p className='text-[#000] text-lg font-semibold leading-[140%]'>
            닉네임
          </p>
          <p className='text-[#000] text-lg leading-[140%]'>
            {accountInfo.nickname || '닉네임'}
          </p>
        </div>
        <div className='border-b border-solid border-[#000] flex items-center gap-12'>
          <p className='text-[#000] text-lg font-semibold leading-[140%]'>
            생년월일
          </p>
          <p className='text-[#000] text-lg leading-[140%]'>
            {accountInfo.birth || '생년월일'}
          </p>
        </div>
      </div>

      {/* change pw */}
      <div className='flex justify-end'>
        <button
          onClick={() => navigate('/settings/change-password')}
          className='py-4 px-10 min-w-80 border border-solid border-primary bg-white_1 text-[15px] leading-[140%] text-primary hover:cursor-pointer'>
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default SettingAccountPage;
