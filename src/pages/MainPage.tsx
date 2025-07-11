import {useState} from 'react';
import Header from '@/components/main/Header';
import WeekCalendar from '@/components/main/WeekCalendar';
import type {Schedule} from '@/types/schedule';

export default function MainPage() {
  /** mock user data */
  const isLoggedIn = true;
  const username = '민아';

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '0',
      category: '연극',
      title: '<어쩌구 연극> 3차 티켓팅',
      isLike: false,
      date: new Date('2025-07-10'),
    },
    {
      id: '1',
      category: '연극',
      title: '<어쩌구 연극> 3차 티켓팅',
      isLike: true,
      date: new Date('2025-07-10'),
    },
    {
      id: '2',
      category: '콘서트',
      title: '<어쩌구 콘서트> 3차 티켓팅',
      isLike: true,
      date: new Date('2025-07-11'),
    },
    {
      id: '3',
      category: '뮤지컬',
      title: '<어쩌구 뮤지컬> 3차 티켓팅',
      isLike: false,
      date: new Date('2025-07-12'),
    },
  ]);

  const handleLikeClick = (clicked: Schedule) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === clicked.id ? {...item, isLike: !item.isLike} : item
      )
    );
  };

  return (
    <div className='w-full bg-black flex flex-col items-center '>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <WeekCalendar
        isLoggedIn={isLoggedIn}
        schedules={schedules}
        onLikeClick={handleLikeClick}
        onScheduleClick={(schedule) =>
          console.log('Schedule clicked:', schedule)
        }
        onViewMore={() => console.log('View more clicked')}
      />
    </div>
  );
}
