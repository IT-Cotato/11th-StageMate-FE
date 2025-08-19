import {useState, useEffect} from 'react';
import MainHeader from '@/components/main/MainHeader';
import WeekCalendar from '@/components/main/WeekCalendar';
import type {Schedule} from '@/types/schedule';
import RecommendedPlay from '@/components/main/RecommendedPlay';
import {getPerformanceSchedules} from '@/api/performanceScheduleApi';
import OnboardingWrapper from '@/components/modal/OnboardingModal/OnboardingWrapper';
import {useAuthStore} from '@/stores/authStore';
import {useScrapStore} from '@/stores/useScrapStore';
import {useNavigate} from 'react-router-dom';
import {toSchedule} from '@/util/scheduleMapper';

export default function MainPage() {
  const {user, isAuthenticated} = useAuthStore();
  const {initializeFromServer} = useScrapStore();
  const [isOnboardingDone, setIsOnboardingDone] = useState(
    localStorage.getItem('isOnboardingDone') === 'true'
  );
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        
        // 전역 스크랩 상태 초기화
        initializeFromServer(
          apiData.map(item => ({
            id: String(item.performanceScheduleId),
            isScraped: item.isScraped
          }))
        );
      } catch (error) {
        if (!cancelled) setSchedules([]);
        console.error('Main Page 스케줄 조회 실패:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchSchedules();
    return () => {
      cancelled = true;
    };
  }, [initializeFromServer]);

  const handleOnboardingDone = () => {
    setIsOnboardingDone(true);
    localStorage.setItem('isOnboardingDone', 'true');
  };

  const handleLikeClick = () => {
    // ScheduleItem에서 자체 처리하므로 별도 로직 불필요
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
            isLoading={isLoading}
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
