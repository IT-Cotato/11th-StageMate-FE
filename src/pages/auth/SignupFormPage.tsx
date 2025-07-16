import StateButtonStroke from '@/components/auth/StateButtonStroke';
import ButtonFill from '@/components/global/ButtonFill';
import PageHeader from '@/components/global/PageHeader';
import CheckDefault from '@/assets/vector-check/vector-check-default.svg?react';
import {useState} from 'react';

type FormValue = {
  id: string;
  pw: string;
  pwCheck: string;
  name: string;
  nickName: string;
  email: string;
  certificationNumber: string;
};

const SignupFormPage = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    nickName: '',
    email: '',
    certificationNumber: '',
  });

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, id: newValue}));
  };

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white'>
      {/* 헤더 */}
      <PageHeader title={'회원가입'} />

      <div className='pt-40 px-16 flex flex-col gap-60'>
        <h1 className='text-[#141313] text-[32px] font-bold leading-[140%]'>
          회원가입
        </h1>

        {/* 입력폼 */}
        <div className='flex flex-col gap-42'>
          {/* ID */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='string'
                minLength={4}
                maxLength={16}
                value={formValue.id}
                onChange={handleIdChange}
                placeholder='아이디*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary-50'
              />
              <StateButtonStroke
                text={'중복확인'}
                // todo : 아이디 중복 확인 api 연결
                onClick={() => console.log('아이디 중복 확인 버튼 클릭')}
              />
            </div>
            <h1
              className={`self-stretch text-xl leading-[140%] text-[#3c3c3c]`}>
              (영문 소문자와 대문자를 조합하여 4~16자)
            </h1>
          </div>

          {/* PW */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='password'
                minLength={4}
                maxLength={16}
                placeholder='비밀번호*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary-50'
              />
            </div>
            <h1 className='self-stretch text-[#3c3c3c] text-xl leading-[140%]'>
              (영문 소문자와 대문자를 조합하여 4~16자)
            </h1>
          </div>

          {/* PWCheck */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='password'
                minLength={4}
                maxLength={16}
                placeholder='비밀번호 확인*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary-50'
              />
              <CheckDefault className='w-30 h-30 shrink-0 aspect-square' />
            </div>
          </div>

          {/* Name */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='string'
                minLength={4}
                maxLength={16}
                placeholder='이름*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary-50'
              />
            </div>
          </div>

          {/* NickName */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='string'
                placeholder='닉네임*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary-50'
              />
              <StateButtonStroke
                text='중복확인'
                onClick={() => console.log('닉네임 중복 확인 버튼 클릭')}
              />
            </div>
          </div>

          {/* Email */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='email'
                minLength={4}
                maxLength={16}
                placeholder='이메일*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary-50'
              />
            </div>
          </div>

          {/* CertificationNumber */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='number'
                placeholder='인증번호 입력*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary-50'
              />
              <StateButtonStroke
                text='인증번호 발송'
                onClick={() => console.log('인증번호 발송 버튼 클릭')}
              />
            </div>
          </div>

          {/* Birth */}
        </div>

        {/* 가입 버튼 */}
        <ButtonFill
          text='회원 가입하기'
          onClick={() => console.log('입력 값 콘솔에 출력')}
        />
      </div>
    </div>
  );
};

export default SignupFormPage;
