import UserCircle from '@/assets/users/user-circle.svg?react';
import type {BlockedUserType} from '@/types/blocked';

interface BlockeUserProps {
  user: BlockedUserType;
}

const BlockedUser = ({user}: BlockeUserProps) => {
  return (
    <div className='flex py-7 px-13 self-stretch justify-between bg-gray-1'>
      <div className='flex items-center gap-11'>
        <UserCircle className='w-33 h-33' />
        <h1 className='text-[#000] text-2xl font-medium leading-[140%]'>
          {user.nickname}
        </h1>
      </div>
      <button
        className='py-7 px-18 rounded-[50px] bg-secondary text-white_1 text-[18px] leading-[140%] cursor-pointer'
        onClick={() => console.log(user.id, '차단해제 클릭')}>
        차단해제
      </button>
    </div>
  );
};

export default BlockedUser;
