import UserCircle from '@/assets/users/user-circle.svg?react';
import type {BlockedUserType} from '@/types/blocked';
import Modal from '../global/Modal';
import {unblockModal} from '@/constants/modalConstants';
import {useState} from 'react';

interface BlockeUserProps {
  user: BlockedUserType;
  unblockClick: () => void;
}

const BlockedUser = ({user, unblockClick}: BlockeUserProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleUnblockClick = () => {
    console.log(user.id, '차단해제 클릭');
    unblockClick();
    setShowModal(false);
  };

  return (
    <>
      <div className='flex py-7 px-13 self-stretch justify-between bg-gray-1'>
        <div className='flex items-center gap-11'>
          <UserCircle className='w-33 h-33' />
          <h1 className='text-[#000] text-2xl font-medium leading-[140%]'>
            {user.nickname}
          </h1>
        </div>
        <button
          className='py-7 px-18 rounded-[50px] bg-secondary text-white_1 text-[18px] leading-[140%] cursor-pointer'
          onClick={() => setShowModal(true)}>
          차단해제
        </button>
      </div>

      {showModal && (
        <Modal
          title={unblockModal.title}
          content={unblockModal.content}
          leftText='아니오'
          rightText='네, 확인했어요'
          onLeftClick={() => setShowModal(false)}
          onRightClick={handleUnblockClick}
        />
      )}
    </>
  );
};

export default BlockedUser;
