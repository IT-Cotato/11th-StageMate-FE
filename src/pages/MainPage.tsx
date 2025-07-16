import {useState} from 'react';
import Header from '@/components/main/Header';
import WeekCalendar from '@/components/main/WeekCalendar';
import type {Schedule} from '@/types/schedule';
import Magazine from '@/components/main/Magazine';
import {mockSchedules} from '@/mocks/mockSchedules';
import OnboardingWrapper from '@/components/modal/OnboardingModal/OnboardingWrapper';

export default function MainPage() {
  /** mock user data */
  const isLoggedIn = false;
  const username = '민아';
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);

  const handleLikeClick = (clicked: Schedule) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === clicked.id ? {...item, isLike: !item.isLike} : item
      )
    );
  };

  return (
    <div className='relative'>
      {!isLoggedIn && !isOnboardingDone && (
        <OnboardingWrapper onDone={() => setIsOnboardingDone(true)} />
      )}
      <div className='bg-black flex flex-col items-center'>
        <Header isLoggedIn={isLoggedIn} username={username} />
        <div className='p-[12px] flex flex-col w-full gap-[12px]'>
          <WeekCalendar
            isLoggedIn={isLoggedIn}
            schedules={schedules}
            onLikeClick={handleLikeClick}
            onScheduleClick={(schedule) =>
              console.log('Schedule clicked:', schedule)
            }
            onViewMore={() => console.log('View more clicked')}
          />
          <Magazine />
        </div>
      </div>
    </div>
  );
}
