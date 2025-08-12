import formatKoreanTime from '@/util/formatKoreanTime';
import Comment from '@/assets/notification/comment.svg?react';
/**
 * 알림 카드 컴포넌트
 * 사용자가 작성한 커뮤니티 글의 댓글에 대한 알림
 * 사용자가 작성한 댓글의 답글에 대한 알림
 */
interface NotificationProps {
  postTitle: string;
  createdAt: string;
  type: string;
}
const NotificationCard = ({postTitle, createdAt, type}: NotificationProps) => {
  const message =
    type === 'COMMENT_ON_MY_POST'
      ? '누군가 댓글을 남겼어요'
      : '댓글에 누군가 답장을 했어요';
  const formattedDate = formatKoreanTime(createdAt);

  return (
    <div className='w-[466px] flex items-center justify-between bg-[#DDE1E6]/75 rounded-[20px] py-10 px-20 gap-20 cursor-pointer h-62'>
      <div className='flex flex-row gap-20 items-center flex-1 min-w-0'>
        <Comment className='w-27' />
        <div className='flex flex-col min-w-0'>
          <span className='font-semibold text-[18px] truncate'>
            {postTitle}
          </span>
          <span className='text-[12px]'>{message}</span>
        </div>
      </div>

      <span className='text-[#3C3C3C]/80 text-[13px] min-w-[60px] text-right shrink-0'>
        {formattedDate}
      </span>
    </div>
  );
};

export default NotificationCard;
