import {getNociesDetail} from '@/api/mypageApi';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';

const AnnouncementDetailPage = () => {
  const {id} = useParams();
  const index = Number(id);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['announcementDetail', id],
    queryFn: () => getNociesDetail(index),
  });

  if (isLoading) {
    return (
      <div>
        <BackButtonTitleHeader title='공지사항' borderBottom />
        <div className='py-24 px-20 flex flex-col justify-start items-start gap-29'>
          <h1 className='text-[#000] text-[34px] font-bold leading-[110%]'>
            공지사항 불러오는 중 ...
          </h1>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <BackButtonTitleHeader title='공지사항' borderBottom />
        <div className='py-24 px-20 flex flex-col justify-start items-start gap-29'>
          <h1 className='text-[#000] text-[34px] font-bold leading-[110%]'>
            공지사항을 찾을 수 없습니다.
          </h1>
        </div>
      </div>
    );
  }

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
