import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import NotificationCard from '@/components/global/NotificationCard';
import {mockNotifications} from '@/mocks/mockNotification';

const NotificationPage = () => {
  const sortedNotifications = [...mockNotifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <div className='flex flex-col px-30 gap-20'>
      <BackButtonTitleHeader title='알림' between={true} />
      <ul className='flex flex-col gap-15 pb-30 items-center'>
        {sortedNotifications.map((notification) => (
          <NotificationCard key={notification.id} {...notification} />
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
