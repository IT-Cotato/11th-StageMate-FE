import {useState} from 'react';
import OnboardingModal from '@/components/modal/OnboardingModal/OnboardingModal';

const onboardingPages = [
  {
    message: '공연 달력 기능으로 전체 공연 일정을\n한눈에 볼 수 있어요',
    imageSrc: new URL('@/assets/onboarding-icons/calendar.svg', import.meta.url)
      .href,
  },
  {
    message: '내가 본 공연을 편하게 아카이빙하고\n느낌을 기록해요',
    imageSrc: new URL('@/assets/onboarding-icons/chat.svg', import.meta.url)
      .href,
  },
  {
    message: '여러 사람들과 함께\n공연을 덕질하고 정보를 얻어요',
    imageSrc: new URL('@/assets/onboarding-icons/notebook.svg', import.meta.url)
      .href,
  },
  {
    message: '빠른 검색창으로 내가 찾고 싶은\n공연을 편하게 찾을 수 있어요',
    imageSrc: new URL('@/assets/onboarding-icons/search.svg', import.meta.url)
      .href,
    isLast: true,
  },
];

export default function OnboardingWrapper({onDone}: {onDone: () => void}) {
  const [step, setStep] = useState(0);
  const {message, imageSrc, isLast} = onboardingPages[step];

  const handleNext = () => {
    if (isLast) {
      onDone();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className='absolute inset-0 z-50 flex items-start justify-center pt-[24px] bg-black/30'>
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
  );
}
