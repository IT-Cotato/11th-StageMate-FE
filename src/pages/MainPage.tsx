import {useState} from 'react';
import Header from '@/components/main/Header';
import WeekCalendar from '@/components/main/WeekCalendar';
import type {Schedule} from '@/types/schedule';
import Magazine from '@/components/main/Magazine';
import {mockSchedules} from '@/mocks/mockSchedules';

export default function MainPage() {
  /** mock user data */
  const isLoggedIn = true;
  const username = '민아';

  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);

  const handleLikeClick = (clicked: Schedule) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === clicked.id ? {...item, isLike: !item.isLike} : item
      )
    );
  };

  return (
    <div className='bg-black flex flex-col items-center '>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <div className='p-[14px] flex flex-col w-full gap-16'>
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
  );
}
