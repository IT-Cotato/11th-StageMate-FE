import useScrollLockWithRestore from '@/hooks/useScrollLockwithRestore';

interface CameraUnavailableModalProps {
  onClose: () => void;
}
const CameraUnavailableModal = ({onClose}: CameraUnavailableModalProps) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useScrollLockWithRestore();

  return (
    <div
      className='w-[600px] h-full bg-black/20 flex items-center justify-center'
      onClick={handleBackgroundClick}>
      <div className='flex w-[478px] h-[247px] justify-center items-center bg-white border-primary border-[1px]'>
        <div className='flex flex-col items-center gap-17'>
          <div className='text-center text-xl'>
            웹 브라우저에서는 촬영 기능이 <br />
            지원되지 않습니다. <br />
            스마트폰 또는 태블릿에서 접속하시면 <br />
            촬영 기능을 이용하실 수 있어요. <br />
          </div>
          <button
            onClick={onClose}
            className='flex w-[112px] h-36 bg-primary items-center justify-center text-[17px] text-white rounded-[5px] cursor-pointer'>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
export default CameraUnavailableModal;
