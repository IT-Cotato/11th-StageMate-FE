import Comment from '@/assets/notification/comment.svg?react';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';
import {isWriteableUiCategory, reverseCategoryMap} from '@/util/categoryMapper';
import formatKoreanNotificationTime from '@/util/formatKoreanNotificationTime';

/**
 * 알림 카드 컴포넌트
 * 사용자가 작성한 커뮤니티 글의 댓글에 대한 알림
 * 사용자가 작성한 댓글의 답글에 대한 알림
 */
interface NotificationProps {
  title: string;
  formattedDate: string;
  content: string;
  postId: number;
  category: string;
}
const NotificationCard = ({
  title,
  formattedDate,
  content,
  postId,
  category,
}: NotificationProps) => {
  const {goToPostDetail} = useCommunityNavigation();
  const slugCategory = isWriteableUiCategory(category)
    ? reverseCategoryMap[category]
    : 'daily';
  return (
    <div
      className='w-[466px] flex items-center justify-between bg-[#DDE1E6]/75 rounded-[20px] py-10 px-20 gap-20 cursor-pointer h-62'
      onClick={() => goToPostDetail(slugCategory, postId)}>
      <div className='flex flex-row gap-20 items-center flex-1 min-w-0'>
        <Comment className='w-27' />
        <div className='flex flex-col min-w-0'>
          <span className='font-semibold text-[18px] truncate'>{title}</span>
          <span className='text-[12px]'>{content}</span>
        </div>
      </div>

      <span className='text-[#3C3C3C]/80 text-[13px] min-w-[60px] text-right shrink-0'>
        {formatKoreanNotificationTime(formattedDate)}
      </span>
    </div>
  );
};

export default NotificationCard;
