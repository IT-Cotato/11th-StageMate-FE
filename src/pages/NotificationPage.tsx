import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import NotificationCard from '@/components/global/NotificationCard';
import {useNotifications} from '@/hooks/useNotification';
import '@/styles/skeleton.css';

const SkeletonNotificationCard = () => (
  <div className='w-[466px] h-62 rounded-[20px] mb-4 flex items-center skeleton-shimmer'></div>
);

const NotificationPage = () => {
  const {data: notifications, isLoading, error} = useNotifications();
  const skeletonCount = notifications?.length || 5;
  if (error)
    return (
      <div className='flex justify-center py-40'>
        오류 발생: {error.message}
      </div>
    );
  return (
    <div className='flex flex-col px-30 gap-20'>
      <BackButtonTitleHeader title='알림' between={true} />

      {isLoading ? (
        <ul className='flex flex-col gap-15 pb-30 items-center'>
          {Array.from({length: skeletonCount}).map((_, idx) => (
            <SkeletonNotificationCard key={idx} />
          ))}
        </ul>
      ) : !notifications || notifications.length === 0 ? (
        <div className='flex flex-col items-center py-40'>
          <span className='text-gray-400 text-[16px]'>
            현재 알림이 없습니다.
          </span>
        </div>
      ) : (
        <ul className='flex flex-col gap-15 pb-30 items-center'>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.postId}
              title={notification.title}
              formattedDate={notification.formattedDate}
              content={notification.content}
              postId={notification.postId}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
