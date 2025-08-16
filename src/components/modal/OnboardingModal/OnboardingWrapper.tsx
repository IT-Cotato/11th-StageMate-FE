import {useState} from 'react';
import OnboardingModal from '@/components/modal/OnboardingModal/OnboardingModal';
import useScrollLockWithRestore from '@/hooks/useScrollLockwithRestore';

const onboardingPages = [
  {
    message: (
      <>
        공연 달력 기능으로 전체 공연
        <br />
        일정을 한눈에 볼 수 있어요
      </>
    ),
    imageSrc: new URL('@/assets/onboarding-icons/calendar.svg', import.meta.url)
      .href,
  },
  {
    message: (
      <>
        내가 본 공연을 편하게
        <br />
        아카이빙 하고 느낌을 기록해요
      </>
    ),
    imageSrc: new URL('@/assets/onboarding-icons/chat.svg', import.meta.url)
      .href,
  },
  {
    message: (
      <>
        여러 사람들과 함께
        <br />
        공연을 덕질하고 정보를 얻어요
      </>
    ),
    imageSrc: new URL('@/assets/onboarding-icons/notebook.svg', import.meta.url)
      .href,
  },
  {
    message: (
      <>
        빠른 검색창으로 내가 찾고 싶은
        <br />
        공연을 편하게 찾을 수 있어요
      </>
    ),
    imageSrc: new URL('@/assets/onboarding-icons/search.svg', import.meta.url)
      .href,
    isLast: true,
  },
];

export default function OnboardingWrapper({onDone}: {onDone: () => void}) {
  const [step, setStep] = useState(0);
  const {message, imageSrc, isLast} = onboardingPages[step];

  useScrollLockWithRestore();

  const handleNext = () => {
    if (isLast) {
      onDone();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className='fixed inset-0 z-[9999] flex justify-center'>
      <div className='w-full max-w-[600px] h-full bg-black/50 flex items-center justify-center'>
        <OnboardingModal
          message={message}
          imageSrc={imageSrc}
          showPrev={step > 0}
          showNext={!isLast}
          isLastStep={isLast}
          onPrev={() => setStep((prev) => prev - 1)}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
