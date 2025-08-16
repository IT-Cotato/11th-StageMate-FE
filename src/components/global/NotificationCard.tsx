import Comment from '@/assets/notification/comment.svg?react';
import {useNavigate} from 'react-router-dom';
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
}
const NotificationCard = ({
  title,
  formattedDate,
  content,
  postId,
}: NotificationProps) => {
  const navigate = useNavigate();
  return (
    <div
      className='w-[466px] flex items-center justify-between bg-[#DDE1E6]/75 rounded-[20px] py-10 px-20 gap-20 cursor-pointer h-62'
      onClick={() => navigate(`/community/${postId}`)}>
      <div className='flex flex-row gap-20 items-center flex-1 min-w-0'>
        <Comment className='w-27' />
        <div className='flex flex-col min-w-0'>
          <span className='font-semibold text-[18px] truncate'>{title}</span>
          <span className='text-[12px]'>{content}</span>
        </div>
      </div>

      <span className='text-[#3C3C3C]/80 text-[13px] min-w-[60px] text-right shrink-0'>
        {formattedDate}
      </span>
    </div>
  );
};

export default NotificationCard;
