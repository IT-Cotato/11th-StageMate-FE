import {useState, useEffect} from 'react';
import MainHeader from '@/components/main/MainHeader';
import WeekCalendar from '@/components/main/WeekCalendar';
import type {Schedule} from '@/types/schedule';
import RecommendedPlay from '@/components/main/RecommendedPlay';
import {getPerformanceSchedules} from '@/api/performanceScheduleApi';
import OnboardingWrapper from '@/components/modal/OnboardingModal/OnboardingWrapper';
import {useAuthStore} from '@/stores/authStore';
import {useNavigate} from 'react-router-dom';
import {toSchedule} from '@/util/scheduleMapper';

export default function MainPage() {
  const {user, isAuthenticated} = useAuthStore();
  const [isOnboardingDone, setIsOnboardingDone] = useState(
    localStorage.getItem('isOnboardingDone') === 'true'
  );
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchSchedules = async () => {
      try {
        const now = new Date();
        const apiData = await getPerformanceSchedules({
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        });

        if (cancelled) return;
        const formatted = apiData.map(toSchedule);
        setSchedules(formatted);
      } catch (error) {
        if (!cancelled) setSchedules([]);
        console.error('Main Page 스케줄 조회 실패:', error);
      }
    };

    fetchSchedules();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOnboardingDone = () => {
    setIsOnboardingDone(true);
    localStorage.setItem('isOnboardingDone', 'true');
  };

  const handleLikeClick = (clicked: Schedule) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === clicked.id ? {...item, isLike: !item.isLike} : item
      )
    );
  };

  return (
    <div className='relative min-h-screen'>
      {!isAuthenticated && !isOnboardingDone && (
        <OnboardingWrapper onDone={handleOnboardingDone} />
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
            onViewMore={() => navigate('/calendar')}
          />
          <RecommendedPlay />
        </div>
      </div>
    </div>
  );
}
