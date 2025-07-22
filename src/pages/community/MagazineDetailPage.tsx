import ContentHeader from '@/components/community/content/ContentHeader';
import {useParams} from 'react-router-dom';
import {mockMagazineDetail} from '@/mocks/mockMagazineDetail';
import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import BookMark from '@/assets/community/bookmark.svg?react';
import Share from '@/assets/community/share.svg?react';
import PlayTag from '@/components/main/PlayTag';

const MagazineDetailPage = () => {
  const {magazineId} = useParams<{magazineId?: string}>();

  // todo : 매거진 디테일 api 연결
  const data = mockMagazineDetail.find(
    (magazine) => magazine.id === Number(magazineId)
  );

  const handleShareClick = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
        alert('링크 복사에 실패했습니다.');
      });
  };

  if (!data) return <div>존재하지 않는 매거진입니다.</div>;

  return (
    <div className='bg-black h-full'>
      <div className='rounded-b-2xl bg-white'>
        {/* 헤더 */}
        <ContentHeader />

        {/* 매거진 내용 */}
        <div className='mt-10 px-15 py-21 flex flex-col gap-20'>
          {/* 포스터 */}
          {data.imgUrl && <img src={data.imgUrl} alt={data.title} />}

          {/* 매거진 컨텐츠 헤더 */}
          <div className='flex justify-between'>
            <div className='flex flex-col gap-15'>
              <h1 className='text-black text-[28px] font-bold leading-[110%]'>
                {data.title}
              </h1>
              <div className='flex flex-col gap-10'>
                <h2 className='text-gray-2 text-xl font-bold leading-[110%]'>
                  {data.subTitle}
                </h2>
                <h3 className='text-gray-2 text-[13px] leading-[110%]'>
                  {data.date}
                </h3>
              </div>
            </div>
            <div className='flex gap-20'>
              <div className='flex gap-14'>
                <div className='flex flex-col items-center gap-2 hover:cursor-pointer'>
                  {data.isHearted ? (
                    <FullHeart className='w-27 h-27 aspect-square' />
                  ) : (
                    <EmptyHeart className='w-27 h-27 aspect-square stroke-2 stroke-black' />
                  )}
                  <p className='text-[#000] text-center font-roboto text-sm font-medium leading-[110%]'>
                    {data.heartCount}
                  </p>
                </div>
                <div className='flex flex-col items-center gap-2 hover:cursor-pointer'>
                  {data.isMarked ? (
                    <BookMark className='text-secondary w-27 h-27 aspect-square' />
                  ) : (
                    <BookMark className='w-27 h-27 aspect-square' />
                  )}
                  <p className='text-[#000] text-center font-roboto text-sm font-medium leading-[110%]'>
                    {data.markCount}
                  </p>
                </div>
              </div>

              <Share
                onClick={handleShareClick}
                className='fill-[#21272a] w-27 h-27 aspect-square hover:cursor-pointer'
              />
            </div>
          </div>

          {/* 매거진 컨텐츠 */}
          <p>{data.text}</p>

          {/* 매거진 태그 */}
          <div className='flex gap-10'>
            {data.tags.map((tag, index) => (
              <PlayTag key={index} text={tag} />
            ))}
          </div>
        </div>
      </div>

      {/* 추천 매거진 */}
      <div className='mt-10 rounded-[20px] bg-white'>df</div>
    </div>
  );
};

export default MagazineDetailPage;
