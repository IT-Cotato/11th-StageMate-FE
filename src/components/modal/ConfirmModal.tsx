interface ConfirmModalProps {
  type: 'delete' | 'report' | 'block';
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({type, onCancel, onConfirm}: ConfirmModalProps) => {
  const getMessage = (type: ConfirmModalProps['type']) => {
    const messages = {
      delete: {
        title: '삭제하시겠습니까?',
        description: [],
      },
      report: {
        title: '신고를 진행하시겠습니까?',
        description: [
          '신고는 검토 후 운영정책에 따라 처리됩니다.',
          '허위 신고 또는 악의적인 신고 시 이용 제한 및 법적 책임이 따를 수 있습니다.',
        ],
      },
      block: {
        title: '해당 사용자를 차단하시겠습니까?',
        description: [
          '차단 시 해당 사용자의 댓글을 더 이상 볼 수 없습니다.',
          '언제든 설정에서 차단을 해제할 수 있습니다.',
        ],
      },
    };
    return messages[type];
  };

  const {title, description} = getMessage(type);

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center max-w-[600px] bg-black/30 mx-auto'>
      <div className='bg-[#ffffff] stroke-primary px-[61px] py-[41px] max-w-[478px] w-full flex flex-col items-center gap-[35px]'>
        <p className='text-[30px] font-bold text-black text-center leading-[110%]'>
          {title}
        </p>
        {description.map((line, index) => (
          <p
            key={index}
            className='text-[20px] font-normal text-black text-center'>
            {line}
          </p>
        ))}
        <div
          className='text-[17px] font-normal text-black flex gap-[20px] w-full'
          style={{marginTop: '-12px'}}>
          <button
            onClick={onCancel}
            className='w-full text-gray-2 bg-white px-4 py-3 rounded-[5px] text-[17px] font-medium cursor-pointer'>
            아니요
          </button>
          <button
            onClick={onConfirm}
            className='w-full text-white bg-primary px-4 py-3 rounded-[5px] text-[17px] font-medium cursor-pointer'>
            네, 확인했어요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
