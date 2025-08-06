import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {mockAnnouncementDetail} from '@/mocks/mockAnnouncementDetail';
import {useParams} from 'react-router-dom';

const AnnouncementDetailPage = () => {
  const {id} = useParams();

  const data = mockAnnouncementDetail[Number(id)];

  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title='공지사항' borderBottom />

      {/* announcement */}
      <div className='py-24 px-20 flex flex-col justify-start items-start gap-29'>
        <h1 className='text-[#000] text-[34px] font-bold leading-[110%]'>
          {data.title}
        </h1>
        <h2 className='text-[#000] text-sm leading-[110%]'>
          작성 시간 {data.createdAt} | 조회수 {data.viewCount} | 작성자{' '}
          {data.author}
        </h2>
        <p className='text-[#000] text-xl leading-[110%] whitespace-pre-line'>
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;
