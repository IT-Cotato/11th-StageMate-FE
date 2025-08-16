/* eslint-disable @typescript-eslint/no-explicit-any */
import StateButtonStroke from '@/components/auth/StateButtonStroke';
import ButtonFill from '@/components/global/ButtonFill';
import PageHeader from '@/components/global/PageHeader';
import CheckDefault from '@/assets/vector-check/vector-check-default.svg?react';
import CheckConfirmed from '@/assets/vector-check/vector-check-confirmed.svg?react';
import {useState} from 'react';
import {
  isValidId,
  isValidPw,
  isValidEmail,
  isValidYear,
  isValidMonth,
  isValidDay,
} from '@/util/validation';
import {useNavigate} from 'react-router-dom';
import {
  getCheckNickname,
  getCheckUserId,
  postEmailSendCode,
  postEmailVerifyCode,
  postSignupInfo,
} from '@/api/authApi';
import {useMutation} from '@tanstack/react-query';
import {getMypageInfo} from '@/api/mypageApi';
import {useAuthStore} from '@/stores/authStore';
import type {FormState} from '@/types/auth';

const SignupFormPage = () => {
  const navigate = useNavigate();
  const {login} = useAuthStore();

  const [formState, setFormState] = useState<FormState>({
    id: {value: '', isValid: false, isChecked: false, isAvailable: false},
    pw: {value: '', isValid: false},
    pwCheck: {value: '', isValid: false},
    name: {value: '', isValid: false},
    nickName: {value: '', isValid: false, isChecked: false, isAvailable: false},
    email: {value: '', isValid: false},
    certificationNumber: {value: '', isValid: false},
    year: {value: '', isValid: false},
    month: {value: '', isValid: false},
    day: {value: '', isValid: false},
  });

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormState((prev) => {
      let isValid = false;
      const isCheckableField = name === 'id' || name === 'nickName';

      // 아이디나 닉네임이 변경되면 isChecked와 isAvailable 상태를 초기화하여 재확인 유도
      const resetState = isCheckableField
        ? {isAvailable: false, isChecked: false}
        : {};

      const updatedField = {
        ...prev[name as keyof FormState],
        value,
        ...resetState,
      };

      // 실시간 유효성 검사 로직
      switch (name) {
        case 'id':
          isValid = isValidId(value);
          break;
        case 'pw': {
          isValid = isValidPw(value);
          // 비밀번호 변경 시, 확인 필드의 유효성도 같이 업데이트
          const isPwCheckValid = prev.pwCheck.value === value && isValid;
          prev.pwCheck.isValid = isPwCheckValid;
          break;
        }
        case 'pwCheck':
          isValid = prev.pw.value === value && isValidPw(value);
          break;
        case 'email':
          isValid = isValidEmail(value);
          break;
        case 'name':
        case 'nickName':
        case 'certificationNumber':
          isValid = value.length > 0;
          break;
        case 'year':
          isValid = isValidYear(value);
          break;
        case 'month':
          isValid = isValidMonth(value);
          break;
        case 'day':
          isValid = isValidDay(value);
          break;
      }
      updatedField.isValid = isValid;

      return {...prev, [name]: updatedField};
    });
  };

  // -- Mutations --

  // 아이디 중복 확인 Mutation
  const checkIdMutation = useMutation({
    mutationFn: getCheckUserId,
    onSuccess: (data) => {
      console.log(data.isAvailable);
      setFormState((prev) => ({
        ...prev,
        id: {...prev.id, isChecked: true, isAvailable: data.isAvailable},
      }));
    },
    onError: (error) => alert(error.message),
  });

  // 닉네임 중복 확인 Mutation
  const checkNicknameMutation = useMutation({
    mutationFn: getCheckNickname,
    onSuccess: (data) => {
      setFormState((prev) => ({
        ...prev,
        nickName: {
          ...prev.nickName,
          isChecked: true,
          isAvailable: data.isAvailable,
        },
      }));
    },
    onError: (error) => alert(error.message),
  });

  // 이메일 인증번호 발송 Mutation
  const emailMutation = useMutation({
    mutationFn: postEmailSendCode,
    onSuccess: () => alert('인증번호가 발송되었습니다.'),
    onError: (error: any) => alert(error.message),
  });

  // 회원가입 전체 프로세스 Mutation
  const signupMutation = useMutation({
    mutationFn: async () => {
      // 1. 이메일 인증 코드 확인
      await postEmailVerifyCode({
        email: formState.email.value,
        code: formState.certificationNumber.value,
      });

      // 2. 회원가입 정보 전송
      const birthdate =
        formState.year.value && formState.month.value && formState.day.value
          ? `${formState.year.value}-${formState.month.value}-${formState.day.value}`
          : '';

      console.log('Signup Info', {
        userId: formState.id.value,
        email: formState.email.value,
        password: formState.pw.value,
        passwordConfirm: formState.pwCheck.value,
        name: formState.name.value,
        nickname: formState.nickName.value,
        birthdate,
      });

      const signupRes = await postSignupInfo({
        userId: formState.id.value,
        email: formState.email.value,
        password: formState.pw.value,
        passwordConfirm: formState.pwCheck.value,
        name: formState.name.value,
        nickname: formState.nickName.value,
        birthdate,
      });

      // 3. 마이페이지 정보 가져오기
      const mypageRes = await getMypageInfo();
      const userInfo = mypageRes.data;

      // 4. 모든 단계가 성공했을 때 로그인 처리 및 페이지 이동
      login(signupRes.accessToken, signupRes.refreshToken, userInfo);
      navigate('/signup-complete');
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  // -- Event Handlers --

  const handleCheckId = () => {
    if (formState.id.isValid) {
      checkIdMutation.mutate(formState.id.value);
    }
  };

  const handleCheckNickname = () => {
    if (formState.nickName.isValid) {
      checkNicknameMutation.mutate(formState.nickName.value);
    }
  };

  const handleSendCode = () => {
    if (formState.email.isValid) {
      emailMutation.mutate(formState.email.value);
    }
  };

  const handleSignupClick = () => {
    if (isFormValid()) {
      signupMutation.mutate();
    } else {
      alert('모든 필수 항목을 올바르게 입력하고 중복 확인을 완료해주세요.');
    }
  };

  // 폼 전체 유효성 검사
  const isFormValid = (): boolean => {
    const {
      id,
      pw,
      pwCheck,
      name,
      nickName,
      email,
      certificationNumber,
      year,
      month,
      day,
    } = formState;

    return (
      !!id.isValid &&
      !!id.isAvailable &&
      !!pw.isValid &&
      !!pwCheck.isValid &&
      !!name.isValid &&
      !!nickName.isValid &&
      !!nickName.isAvailable &&
      !!email.isValid &&
      !!certificationNumber.isValid &&
      !!year.isValid &&
      !!month.isValid &&
      !!day.isValid
    );
  };

  // 아이디 유효성 메시지 UI 렌더링 로직
  const renderIdMessage = () => {
    const {value, isValid, isChecked, isAvailable} = formState.id;
    const defaultMessage = {
      message: '(영문 소문자와 대문자를 조합하여 4~16자)',
      color: 'text-[#3c3c3c]',
    };

    if (value === '') return defaultMessage;
    if (!isValid)
      return {
        message: '잘못된 아이디 형식입니다. 다시 입력하세요.',
        color: 'text-secondary',
      };
    if (checkIdMutation.isPending)
      return {message: '아이디를 확인 중입니다...', color: 'text-[#3c3c3c]'};

    // isChecked가 true일 때만 isAvailable 결과를 신뢰하여 메시지 출력
    if (isChecked) {
      if (isAvailable)
        return {message: '사용 가능한 아이디입니다.', color: 'text-primary'};
      else
        return {
          message: '이미 사용중인 아이디입니다.',
          color: 'text-secondary',
        };
    }

    return defaultMessage;
  };

  // 비밀번호 유효성 메시지 UI 렌더링 로직
  const renderPWMessage = () => {
    const {value, isValid} = formState.pw;
    if (value === '')
      return {
        message: '(문자, 숫자, 특수문자를 조합하여 8~16자)',
        color: 'text-[#3c3c3c]',
      };
    if (isValid)
      return {
        message: '사용 가능한 비밀번호입니다.',
        color: 'text-primary',
      };
    if (!isValid)
      return {
        message: '잘못된 아이디 형식입니다. 다시 입력하세요.',
        color: 'text-secondary',
      };
    return {
      message: '(문자, 숫자, 특수문자를 조합하여 8~16자)',
      color: 'text-[#3c3c3c]',
    };
  };

  // 닉네임 유효성 메시지 UI 렌더링 로직
  const renderNicknameMessage = () => {
    const {value, isChecked, isAvailable} = formState.nickName;
    const defaultMessage = {
      message: null,
      color: 'text-[#3c3c3c]',
    };

    if (value === '') return defaultMessage;
    if (checkNicknameMutation.isPending)
      return {message: '닉네임을 확인 중입니다...', color: 'text-[#3c3c3c]'};

    // isChecked가 true일 때만 isAvailable 결과를 신뢰하여 메시지 출력
    if (isChecked) {
      if (isAvailable)
        return {message: '사용 가능한 닉네임입니다.', color: 'text-primary'};
      else
        return {
          message: '이미 사용중인 닉네임입니다.',
          color: 'text-secondary',
        };
    }

    return defaultMessage;
  };

  const {message: idMessage, color: idColor} = renderIdMessage();
  const {message: pwMessage, color: pwColor} = renderPWMessage();
  const {message: nicknameMessage, color: nicknameColor} =
    renderNicknameMessage();

  return (
    <div className='w-full sm:w-[600px] mx-auto bg-white'>
      <PageHeader
        title={'회원가입'}
        onLeftClick={() => navigate('/signup-condition')}
        onRightClick={() => navigate('/')}
        className='pt-23'
      />
      <div className='py-40 px-16 flex flex-col gap-60'>
        <h1 className='text-[#141313] text-[32px] font-bold leading-[140%]'>
          회원가입
        </h1>

        <div className='flex flex-col gap-42'>
          {/* ID */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='text'
                name='id'
                minLength={4}
                maxLength={16}
                value={formState.id.value}
                onChange={handleChange}
                placeholder='아이디*'
                className={`focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-2xl leading-[140%] 'text-gray-3'`}
              />
              <StateButtonStroke
                text={checkIdMutation.isPending ? '확인 중' : '중복확인'}
                onClick={handleCheckId}
                disabled={!formState.id.isValid || checkIdMutation.isPending}
              />
            </div>
            <h1 className={`self-stretch text-xl leading-[140%] ${idColor}`}>
              {idMessage}
            </h1>
          </div>

          {/* PW */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='password'
                name='pw'
                minLength={8}
                maxLength={16}
                value={formState.pw.value}
                onChange={handleChange}
                placeholder='비밀번호*'
                className={`focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-2xl leading-[140%] 'text-gray-3'`}
              />
            </div>
            <h1 className={`self-stretch text-xl leading-[140%] ${pwColor}`}>
              {pwMessage}
            </h1>
          </div>

          {/* PWCheck */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='password'
                name='pwCheck'
                minLength={8}
                maxLength={16}
                value={formState.pwCheck.value}
                onChange={handleChange}
                placeholder='비밀번호 확인*'
                className={`focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-2xl leading-[140%] 'text-gray-3'`}
              />
              {formState.pwCheck.isValid === true ? (
                <CheckConfirmed className='w-30 h-30 shrink-0 aspect-square' />
              ) : (
                <CheckDefault className='w-30 h-30 shrink-0 aspect-square' />
              )}
            </div>
          </div>

          {/* Name */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='text'
                name='name'
                value={formState.name.value}
                onChange={handleChange}
                placeholder='이름*'
                className={`focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-2xl leading-[140%] 'text-gray-3'`}
              />
            </div>
          </div>

          {/* NickName */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='text'
                name='nickName'
                value={formState.nickName.value}
                onChange={handleChange}
                placeholder='닉네임*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-2xl leading-[140%]'
              />
              <StateButtonStroke
                text={checkNicknameMutation.isPending ? '확인 중' : '중복확인'}
                onClick={handleCheckNickname}
                disabled={
                  !formState.nickName.isValid || checkNicknameMutation.isPending
                }
              />
            </div>
            {nicknameMessage && (
              <h1
                className={`self-stretch text-xl leading-[140%] ${nicknameColor}`}>
                {nicknameMessage}
              </h1>
            )}
          </div>

          {/* Email */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='email'
                name='email'
                value={formState.email.value}
                onChange={handleChange}
                placeholder='이메일*'
                className={`focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-2xl leading-[140%] 'text-gray-3'`}
              />
            </div>
          </div>

          {/* CertificationNumber */}
          <div className='flex flex-col gap-7'>
            <div className='flex gap-20 items-center'>
              <input
                type='text'
                name='certificationNumber'
                value={formState.certificationNumber.value}
                onChange={handleChange}
                placeholder='인증번호 입력*'
                className='focus:border-0 focus:outline-0 flex grow h-60 py-16 px-17 items-center gap-10 bg-gray-1 text-2xl leading-[140%]'
              />
              <StateButtonStroke
                text={emailMutation.isPending ? '발송 중' : '인증번호 발송'}
                onClick={handleSendCode}
                disabled={!formState.email.isValid || emailMutation.isPending}
              />
            </div>
          </div>

          {/* Birth */}
          <div className='flex gap-16'>
            <input
              type='text'
              name='year'
              maxLength={4}
              value={formState.year.value}
              onChange={handleChange}
              placeholder='YYYY*'
              className={`w-0 focus:border-0 focus:outline-0 grow h-60 py-16 px-17 bg-gray-1 text-2xl leading-[140%] text-gray-3`}
            />
            <input
              type='text'
              name='month'
              maxLength={2}
              value={formState.month.value}
              onChange={handleChange}
              placeholder='MM*'
              className={`w-0 focus:border-0 focus:outline-0 grow h-60 py-16 px-17 bg-gray-1 text-2xl leading-[140%] text-gray-3`}
            />
            <input
              type='text'
              name='day'
              maxLength={2}
              value={formState.day.value}
              onChange={handleChange}
              placeholder='DD*'
              className={`w-0 focus:border-0 focus:outline-0 grow h-60 py-16 px-17 bg-gray-1 text-2xl leading-[140%] text-gray-3`}
            />
          </div>
        </div>

        {/* 가입 버튼 */}
        <ButtonFill
          text={signupMutation.isPending ? '가입 진행 중...' : '회원 가입하기'}
          onClick={handleSignupClick}
          disabled={!isFormValid() || signupMutation.isPending}
        />
      </div>
    </div>
  );
};

export default SignupFormPage;
