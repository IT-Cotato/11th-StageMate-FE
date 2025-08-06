import type {AnnouncementSummaryType} from '@/types/Announcement';
import {useNavigate} from 'react-router-dom';

interface AnnouncementProps {
  announcementSummary: AnnouncementSummaryType;
}

const Announcement = ({announcementSummary}: AnnouncementProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='flex flex-col gap-2 p-10 self-stretch rounded-[10px] border border-solid border-primary-4 bg-[#918f9d]/20 hover:cursor-pointer'
      onClick={() =>
        navigate(`/settings/announcement/${announcementSummary.id}`)
      }>
      <h1 className='text-[#000] text-xl font-medium leading-[110%] line-clamp-1'>
        {announcementSummary.title}
      </h1>
      <p className='text-[#918f9d] text-[15px] font-light leading-[140%] flex items-center gap-10'>
        <span>{announcementSummary.createdAt}</span>
        <span>조회 {announcementSummary.viewCount}</span>
        <span>{announcementSummary.author}</span>
      </p>
    </div>
  );
};

export default Announcement;
