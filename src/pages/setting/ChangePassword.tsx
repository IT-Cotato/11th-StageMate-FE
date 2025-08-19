import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import EyeOpen from '@/assets/eye-open.svg?react';
import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {patchPassword} from '@/api/mypageApi';

type ChangePasswordType = {
  value: string;
  isShow: boolean;
};

interface ChangePasswordState {
  currentPw: ChangePasswordType;
  newPw: ChangePasswordType;
  newPwCheck: ChangePasswordType;
}

const ChangePassword = () => {
  const [passwordState, setPasswordState] = useState<ChangePasswordState>({
    currentPw: {value: '', isShow: false},
    newPw: {value: '', isShow: false},
    newPwCheck: {value: '', isShow: false},
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setPasswordState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof ChangePasswordState],
        value,
      },
    }));
  };

  const handleShowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formElement = (e.target as HTMLElement).closest('form');
    const inputElement = formElement?.querySelector('input');
    const name = inputElement?.name;

    if (name) {
      setPasswordState((prev) => ({
        ...prev,
        [name]: {
          ...prev[name as keyof ChangePasswordState],
          isShow: !prev[name as keyof ChangePasswordState].isShow,
        },
      }));
    }
  };

  const changePasswordMutation = useMutation({
    mutationFn: patchPassword,
    onSuccess: () => {
      alert('비밀번호 변경이 완료되었습니다.');
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleChangePasswordClick = () => {
    changePasswordMutation.mutate({
      currentPassword: passwordState.currentPw.value,
      newPassword: passwordState.newPw.value,
      newPasswordConfirm: passwordState.newPwCheck.value,
    });
  };

  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title='비밀번호 변경' borderBottom />

      {/* content */}
      <div className='py-24 px-20 flex flex-col justify-start items-center gap-27'>
        <div className='self-stretch flex flex-col gap-13'>
          <h1 className='text-[#000] text-xl font-bold leading-24 tracking-[0.2px]'>
            현재 비밀번호
          </h1>
          <div className='px-10'>
            <form className='flex justify-between items-center py-9 px-12 rounded-[5px] border border-solid border-[#000] bg-white text-[#000] gap-10 overflow-hidden'>
              <input
                type={passwordState.currentPw.isShow ? 'text' : 'password'}
                name='currentPw'
                onChange={handleChangeInput}
                minLength={8}
                maxLength={16}
                placeholder='기존 비밀번호를 입력해주세요'
                className='grow placeholder:text-[#cdcdcd] placeholder:text-[18px] leading-24 tracking-[0.18px] focus:outline-0'
              />
              <button type='button' onClick={handleShowClick}>
                <EyeOpen
                  className={`hover:cursor-pointer shrink-0 ${passwordState.currentPw.isShow ? 'stroke-[#000]' : 'stroke-gray-2'}`}
                />
              </button>
            </form>
          </div>
        </div>

        <div className='self-stretch flex flex-col gap-13'>
          <h1 className='text-[#000] text-xl font-bold leading-24 tracking-[0.2px]'>
            새 비밀번호
          </h1>
          <div className='px-10'>
            <form className='flex justify-between items-center py-9 px-12 rounded-[5px] border border-solid border-[#000] bg-white text-[#000] gap-10 overflow-hidden'>
              <input
                type={passwordState.newPw.isShow ? 'text' : 'password'}
                name='newPw'
                onChange={handleChangeInput}
                minLength={8}
                maxLength={16}
                placeholder='새로운 비밀번호를 입력해주세요'
                className='grow placeholder:text-[#cdcdcd] placeholder:text-[18px] leading-24 tracking-[0.18px] focus:outline-0'
              />
              <button type='button' onClick={handleShowClick}>
                <EyeOpen
                  className={`hover:cursor-pointer shrink-0 ${passwordState.newPw.isShow ? 'stroke-[#000]' : 'stroke-gray-2'}`}
                />
              </button>
            </form>
          </div>
        </div>

        <div className='self-stretch flex flex-col gap-13'>
          <h1 className='text-[#000] text-xl font-bold leading-24 tracking-[0.2px]'>
            새 비밀번호 확인
          </h1>
          <div className='px-10'>
            <form className='flex justify-between items-center py-9 px-12 rounded-[5px] border border-solid border-[#000] bg-white text-[#000] gap-10 overflow-hidden'>
              <input
                type={passwordState.newPwCheck.isShow ? 'text' : 'password'}
                name='newPwCheck'
                onChange={handleChangeInput}
                minLength={8}
                maxLength={16}
                placeholder='새로운 비밀번호를 다시 입력해주세요'
                className='grow placeholder:text-[#cdcdcd] placeholder:text-[18px] leading-24 tracking-[0.18px] focus:outline-0'
              />
              <button type='button' onClick={handleShowClick}>
                <EyeOpen
                  className={`hover:cursor-pointer shrink-0 ${passwordState.newPwCheck.isShow ? 'stroke-[#000]' : 'stroke-gray-2'}`}
                />
              </button>
            </form>
          </div>
        </div>

        <button
          onClick={handleChangePasswordClick}
          className='self-stretch mx-10 py-11 rounded-[5px] border border-solid border-black bg-primary-2 text-white text-xl font-medium leading-20 hover:cursor-pointer'>
          확인
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
