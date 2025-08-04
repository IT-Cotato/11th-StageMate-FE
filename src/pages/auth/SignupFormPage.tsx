import StateButtonStroke from '@/components/auth/StateButtonStroke';
import ButtonFill from '@/components/global/ButtonFill';
import PageHeader from '@/components/global/PageHeader';
import CheckDefault from '@/assets/vector-check/vector-check-default.svg?react';
import CheckConfirmed from '@/assets/vector-check/vector-check-confirmed.svg?react';
import {useCallback, useState} from 'react';
import {isValidId, isValidPw, isValidEmail} from '@/util/validation';
import {useNavigate} from 'react-router-dom';

type FormValue = {
  id: string;
  pw: string;
  pwCheck: string;
  name: string;
  nickName: string;
  email: string;
  certificationNumber: string;
  year: string;
  month: string;
  day: string;
};

type ValueState = {
  id: undefined | boolean;
  pw: undefined | boolean;
  pwCheck: undefined | boolean;
  name: undefined | boolean;
  nickName: undefined | boolean;
  email: undefined | boolean;
  certificationNumber: undefined | boolean;
};

const SignupFormPage = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState<FormValue>({
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    nickName: '',
    email: '',
    certificationNumber: '',
    year: '',
    month: '',
    day: '',
  });
  const [isInvalid, setIsInvalid] = useState<ValueState>({
    id: undefined,
    pw: undefined,
    pwCheck: undefined,
    name: undefined,
    nickName: undefined,
    email: undefined,
    certificationNumber: undefined,
  });

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, id: newValue}));
    if (newValue.length === 0) {
      setIsInvalid((prev) => ({...prev, id: undefined}));
    } else if (isValidId(newValue)) {
      setIsInvalid((prev) => ({...prev, id: false}));
    } else {
      setIsInvalid((prev) => ({...prev, id: true}));
    }
  };
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, pw: newValue}));
    if (isValidPw(newValue)) {
      setIsInvalid((prev) => ({...prev, pw: false}));
    } else {
      setIsInvalid((prev) => ({...prev, pw: true}));
    }

    // 비밀번호가 변경되면 비밀번호 확인 상태도 재검증
    if (formValue.pwCheck.length > 0) {
      if (newValue === formValue.pwCheck && isValidPw(newValue)) {
        setIsInvalid((prev) => ({...prev, pwCheck: false}));
      } else {
        setIsInvalid((prev) => ({...prev, pwCheck: true}));
      }
    }
  };
  const handlePwCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, pwCheck: newValue}));
    if (formValue.pw === newValue && isValidPw(newValue)) {
      setIsInvalid((prev) => ({...prev, pwCheck: false}));
    } else {
      setIsInvalid((prev) => ({...prev, pwCheck: true}));
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, name: newValue}));
    if (newValue.length > 0) {
      setIsInvalid((prev) => ({...prev, name: false}));
    } else {
      setIsInvalid((prev) => ({...prev, name: true}));
    }
  };
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, nickName: newValue}));
    if (newValue.length > 0) {
      setIsInvalid((prev) => ({...prev, nickName: false}));
    } else {
      setIsInvalid((prev) => ({...prev, nickName: true}));
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, email: newValue}));
    if (isValidEmail(newValue)) {
      setIsInvalid((prev) => ({...prev, email: false}));
    } else {
      setIsInvalid((prev) => ({...prev, email: true}));
    }
  };
  const handleCertificationNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, certificationNumber: newValue}));
    if (newValue.length > 0) {
      setIsInvalid((prev) => ({...prev, certificationNumber: false}));
    } else {
      setIsInvalid((prev) => ({...prev, certificationNumber: true}));
    }
  };
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, year: newValue}));
  };
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, month: newValue}));
  };
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValue((prev) => ({...prev, day: newValue}));
  };

  const handleSignupClick = useCallback(() => {
    if (
      isInvalid.id === false &&
      isInvalid.pw === false &&
      isInvalid.pwCheck === false &&
      isInvalid.name === false &&
      isInvalid.nickName === false &&
      isInvalid.email === false &&
      isInvalid.certificationNumber === false
    ) {
      // todo : 회원가입 api 연동
      navigate('/signup-complete');
    } else {
      alert('필수 입력 항목을 모두 작성해주세요.');
    }
  }, [isInvalid, formValue]);

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white'>
      {/* 헤더 */}
      <PageHeader
        title={'회원가입'}
        onLeftClick={() => navigate('/signup-condition')}
        onRightClick={() => navigate('/')}
        className='pt-23'
      />

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
                type='text'
                minLength={4}
                maxLength={16}
                value={formValue.id}
                onChange={handleIdChange}
                placeholder='아이디*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary'
              />
              <StateButtonStroke
                text={'중복확인'}
                // todo : 아이디 중복 확인 api 연결
                onClick={() => console.log('아이디 중복 확인 버튼 클릭')}
              />
            </div>
            <h1
              className={`self-stretch text-xl leading-[140%] ${isInvalid.id ? 'text-secondary' : 'text-[#3c3c3c]'}`}>
              {isInvalid.id
                ? '잘못된 값입니다. 다시 입력하세요.'
                : '(영문 소문자와 대문자를 조합하여 4~16자)'}
            </h1>
          </div>

          {/* PW */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='password'
                minLength={8}
                maxLength={16}
                value={formValue.pw}
                onChange={handlePwChange}
                placeholder='비밀번호*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary'
              />
            </div>
            <h1
              className={`self-stretch text-xl leading-[140%] ${isInvalid.pw ? 'text-secondary' : 'text-[#3c3c3c]'}`}>
              {isInvalid.pw
                ? '잘못된 값입니다. 다시 입력하세요.'
                : '(문자, 숫자, 특수문자를 조합하여 8~16자)'}
            </h1>
          </div>

          {/* PWCheck */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='password'
                minLength={8}
                maxLength={16}
                value={formValue.pwCheck}
                onChange={handlePwCheckChange}
                placeholder='비밀번호 확인*'
                className={`focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]
                ${isInvalid.pwCheck ? 'text-secondary' : `text-gray-3`}`}
              />
              {isInvalid.pwCheck === undefined ? (
                <CheckDefault className='w-30 h-30 shrink-0 aspect-square' />
              ) : isInvalid.pwCheck ? (
                <CheckDefault className='w-30 h-30 shrink-0 aspect-square' />
              ) : (
                <CheckConfirmed className='w-30 h-30 shrink-0 aspect-square' />
              )}
            </div>
          </div>

          {/* Name */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='text'
                value={formValue.name}
                onChange={handleNameChange}
                placeholder='이름*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]'
              />
            </div>
          </div>

          {/* NickName */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='text'
                value={formValue.nickName}
                onChange={handleNickNameChange}
                placeholder='닉네임*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]'
              />
              <StateButtonStroke
                text='중복확인'
                // todo : 닉네임 중복 확인 api 연결
                onClick={() => console.log('닉네임 중복 확인 버튼 클릭')}
              />
            </div>
          </div>

          {/* Email */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='email'
                value={formValue.email}
                onChange={handleEmailChange}
                placeholder='이메일*'
                className={`focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-2xl leading-[140%]
              ${isInvalid.email ? 'invalid:text-secondary' : ' text-gray-3'}`}
              />
            </div>
          </div>

          {/* CertificationNumber */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='text'
                value={formValue.certificationNumber}
                onChange={handleCertificationNumberChange}
                placeholder='인증번호 입력*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-gray-3 text-2xl leading-[140%]'
              />
              <StateButtonStroke
                text='인증번호 발송'
                // todo : 인증번호 발송 기능 연결
                onClick={() => console.log('인증번호 발송 버튼 클릭')}
              />
            </div>
          </div>

          {/* Birth */}
          <div className='flex gap-16'>
            {/* YYYY */}
            <input
              type='text'
              maxLength={4}
              value={formValue.year}
              onChange={handleYearChange}
              placeholder='생년월일/YYYY'
              className='w-0 focus:border-0 focus:outline-0 grow h-60 py-16 px-17 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary'
            />

            {/* MM */}
            <input
              type='text'
              value={formValue.month}
              onChange={handleMonthChange}
              maxLength={2}
              placeholder='MM'
              className='w-0 focus:border-0 focus:outline-0 grow h-60 py-16 px-17 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary'
            />

            {/* DD */}
            <input
              type='text'
              value={formValue.day}
              onChange={handleDayChange}
              maxLength={2}
              placeholder='DD'
              className='w-0 focus:border-0 focus:outline-0 grow h-60 py-16 px-17 bg-gray-1 text-gray-3 text-2xl leading-[140%]
              invalid:text-secondary'
            />
          </div>
        </div>

        {/* 가입 버튼 */}
        <ButtonFill text='회원 가입하기' onClick={handleSignupClick} />
      </div>
    </div>
  );
};

export default SignupFormPage;
