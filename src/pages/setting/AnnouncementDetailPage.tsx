import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';

const AnnouncementDetailPage = () => {
  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title='공지사항' borderBottom />

      {/* announcement */}
      <div className='py-24 px-20 flex flex-col justify-start items-start gap-29'>
        <h1></h1>
        <h2></h2>
        <pre></pre>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;
