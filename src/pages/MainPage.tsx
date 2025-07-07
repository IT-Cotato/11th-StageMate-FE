import Header from '@/components/main/Header';
import WeekCalendar from '@/components/main/WeekCalendar';

export default function MainPage() {
  /** mock user data */
  const isLoggedIn = false;
  const username = '민아';

  return (
    <div className='w-full bg-black flex flex-col items-center '>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <WeekCalendar />
    </div>
  );
}
