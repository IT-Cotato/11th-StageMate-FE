import {useState} from 'react';
import MainHeader from '@/components/main/MainHeader';
import WeekCalendar from '@/components/main/WeekCalendar';
import type {Schedule} from '@/types/schedule';
import RecommendedPlay from '@/components/main/RecommendedPlay';
import {mockSchedules} from '@/mocks/mockSchedules';
import OnboardingWrapper from '@/components/modal/OnboardingModal/OnboardingWrapper';
import {useAuthStore} from '@/stores/authStore';

export default function MainPage() {
  /** mock user data */
  const {user, isAuthenticated} = useAuthStore();
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
      {!isAuthenticated && !isOnboardingDone && (
        <OnboardingWrapper onDone={() => setIsOnboardingDone(true)} />
      )}
      <div className='bg-black flex flex-col items-center'>
        <MainHeader isLoggedIn={isAuthenticated} username={user?.name} />
        <div className='p-[12px] flex flex-col w-full gap-[12px]'>
          <WeekCalendar
            isLoggedIn={isAuthenticated}
            schedules={schedules}
            onLikeClick={handleLikeClick}
            onScheduleClick={(schedule) =>
              console.log('Schedule clicked:', schedule)
            }
            onViewMore={() => console.log('View more clicked')}
          />
          <RecommendedPlay />
        </div>
      </div>
    </div>
  );
}
