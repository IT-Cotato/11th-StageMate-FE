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
    <div className='w-[500px] h-[700px] rounded-[20px] overflow-hidden bg-white flex flex-col'>
      {/* 이미지 영역 */}
      <div className='pt-[101px] pb-[31px] flex justify-center bg-white'>
        <img src={imageSrc} alt='Onboarding' className='w-[308px] h-[308px]' />
      </div>

      {/* 보라색 영역 */}
      <div className='h-[260px] rounded-b-[20px] bg-primary pt-[19px] pb-[41px] px-[37px] text-white flex flex-col gap-[88px]'>
        <p className='text-[30px] font-bold text-center leading-tight'>
          {message}
        </p>
        <div className='flex justify-between items-center'>
          {showPrev ? (
            <button onClick={onPrev} className='text-[20px] font-medium'>
              이전
            </button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <button
              onClick={onNext}
              className='px-4 py-2 mt-2 rounded-lg border 1px border-white bg-white/19 text-[18px] font-semibold text-center'>
              시작하기
            </button>
          ) : (
            showNext && (
              <button onClick={onNext} className='text-[20px] font-medium'>
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
