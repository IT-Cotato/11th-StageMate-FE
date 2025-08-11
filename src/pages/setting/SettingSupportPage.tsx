import {deleteWithdraw, postLogout} from '@/api/authApi';
import ChevronRight from '@/assets/arrows/chevron-right.svg?react';
import {useAuthStore} from '@/stores/authStore';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

const SettingSupportPage = () => {
  const navigate = useNavigate();
  const {logout} = useAuthStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await postLogout();
      logout();
    },
    onError: (error) => alert(error.message),
  });

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      await deleteWithdraw();
      alert('회원 탈퇴가 완료되었습니다.');
      logout();
    },
    onError: (error) => alert(error.message),
  });

  const handleLogoutClick = () => {
    logoutMutation.mutate();
  };

  const handlewithdrawClick = () => {
    withdrawMutation.mutate();
  };

  return (
    <div className='flex flex-col gap-29'>
      {/* info */}
      <div className='mx-28 py-37 px-33 flex flex-col bg-[#d9d9d9]'>
        <div
          className='flex justify-between items-center hover:cursor-pointer'
          onClick={() => navigate('/settings/announcement')}>
          <p className='text-xl font-semibold leading-[140%]'>공지사항</p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div
          className='flex justify-between items-center hover:cursor-pointer'
          onClick={() => navigate('/settings/enquire')}>
          <p className='text-xl font-semibold leading-[140%]'>문의하기</p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div
          className='flex justify-between items-center hover:cursor-pointer'
          onClick={() => navigate('/settings/policy-privacy')}>
          <p className='text-xl font-semibold leading-[140%]'>
            개인정보 처리 방침
          </p>
          <ChevronRight className='w-30 h-30' />
        </div>
        <div className='h-1 bg-[#000] my-12' />
        <div
          className='flex justify-between items-center hover:cursor-pointer'
          onClick={() => navigate('/settings/policy-terms')}>
          <p className='text-xl font-semibold leading-[140%]'>이용약관</p>
          <ChevronRight className='w-30 h-30' />
        </div>
      </div>

      {/* logout & secession */}
      <div className='flex justify-end gap-20'>
        <button
          onClick={handleLogoutClick}
          className='py-4 px-10 min-w-80 border border-solid border-primary bg-white_1 text-[15px] leading-[140%] text-primary hover:cursor-pointer'>
          로그아웃
        </button>
        <button
          onClick={handlewithdrawClick}
          className='py-4 px-10 min-w-80 border border-solid border-primary bg-white_1 text-[15px] leading-[140%] text-primary hover:cursor-pointer'>
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default SettingSupportPage;
