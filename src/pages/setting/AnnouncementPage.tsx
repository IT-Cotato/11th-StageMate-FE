import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import Announcement from '@/components/setting/Announcement';
import {mockAnnouncementList} from '@/mocks/mockAnnouncementList';

const AnnouncementPage = () => {
  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title='공지사항' borderBottom />

      {/* announcement list */}
      <div className='py-24 px-20 flex flex-col justify-start items-center gap-14'>
        {mockAnnouncementList.map((announcement) => (
          <Announcement
            key={announcement.id}
            announcementSummary={announcement}
          />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementPage;
