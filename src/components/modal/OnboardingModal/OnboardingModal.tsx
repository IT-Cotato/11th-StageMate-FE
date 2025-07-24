interface OnboardingModalProps {
  message: string;
  imageSrc: string;
  onPrev?: () => void;
  onNext?: () => void;
  showPrev?: boolean;
  showNext?: boolean;
  isLastStep?: boolean;
}

const OnboardingModal = ({
  message,
  imageSrc,
  onPrev,
  onNext,
  showPrev = true,
  showNext = true,
  isLastStep = false,
}: OnboardingModalProps) => {
  return (
    <div className='w-[300px] h-[520px] rounded-[20px] overflow-hidden bg-white flex flex-col'>
      {/* 이미지 영역 */}
      <div className='pt-[34px] pb-[60px] flex justify-center bg-white'>
        <img src={imageSrc} alt='Onboarding' className='w-[211px] h-[214px]' />
      </div>

      {/* 보라색 영역 */}
      <div className='h-[212px] rounded-b-[20px] bg-primary pt-[40px] pb-[37px] px-[14px] text-white flex flex-col gap-[58px] justify-center'>
        <p className='text-[20px] text-xl not-italic font-bold leading-[140%] flex justify-center'>
          {message}
        </p>
        <div className='flex justify-between items-center px-[40px]'>
          {showPrev ? (
            <button onClick={onPrev} className='text-[16px] font-medium'>
              이전
            </button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <button onClick={onNext} className='text-[16px] font-medium'>
              시작하기
            </button>
          ) : (
            showNext && (
              <button onClick={onNext} className='text-[16px] font-medium'>
                다음
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
