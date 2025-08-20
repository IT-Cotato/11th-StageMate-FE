import {useNavigate, useParams} from 'react-router-dom';
import EmptyHeart from '@/assets/hearts/empty-heart.svg?react';
import FullHeart from '@/assets/hearts/full-heart.svg?react';
import BookMark from '@/assets/community/bookmark.svg?react';
import Share from '@/assets/community/share.svg?react';
import PlayTag from '@/components/main/PlayTag';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import SubMagazine from '@/components/community/magazine/SubMagazine';
import {useHorizontalScroll} from '@/hooks/useHorizontalScroll';
import {
  useMagazineDetail,
  useMagazineLike,
  useMagazineScrap,
  useRecommendMagazines,
} from '@/hooks/useMagazine';
import type {SubMagazinePostType} from '@/types/community';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {useAuthStore} from '@/stores/authStore';

const MagazineDetailPage = () => {
  const {user} = useAuthStore();
  const {magazineId} = useParams<{magazineId?: string}>();
  const listWrapperRef = useHorizontalScroll();
  const navigate = useNavigate();
  const {data, isLoading, isError} = useMagazineDetail(Number(magazineId));
  const {data: recommendedMagazines} = useRecommendMagazines();
  const {mutate: toggleScrap} = useMagazineScrap(Number(magazineId));
  const {mutate: toggleLike} = useMagazineLike(Number(magazineId));
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

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return <div>존재하지 않는 매거진입니다.</div>;
  return (
    <div className='bg-black h-full'>
      <div className='rounded-b-2xl bg-white'>
        {/* 헤더 */}
        <div className='flex flex-col pr-10 pl-6 justify-end items-center shrink-0 bg-white gap-20 z-50'>
          <div className='flex w-full justify-between items-center h-40'>
            <ChevronLeft
              className='sm:w-40 sm:h-40 w-30 aspect-square pl-10'
              onClick={() => navigate(-1)}
            />
            <p className='text-[#141313] sm:text-2xl text-xl leading-[140%]'>
              공연 매거진
            </p>
            <div className='w-40 h-40' />
          </div>
        </div>
        {/* 매거진 내용 */}
        <div className='mt-10 px-15 py-21 flex flex-col gap-20'>
          {/* 포스터 */}
          {data.imageUrls[0] && (
            <img src={data.imageUrls[0]} alt={data.title} />
          )}

          {/* 매거진 컨텐츠 헤더 */}
          <div className='flex justify-between'>
            <div className='flex flex-col gap-15'>
              <h1 className='text-black line-clamp-2 w-470 text-[28px] font-bold leading-[110%]'>
                {data.title}
              </h1>
              <div className='flex flex-col gap-10'>
                <h2 className='text-gray-2 text-xl font-bold leading-[110%]'>
                  {data.subTitle}
                </h2>
                <h3 className='text-gray-2 text-[13px] leading-[110%]'>
                  {data.createdAt}
                </h3>
              </div>
            </div>
            {/* 로그인 된 경우에만 좋아요/스크랩 표시 */}
            {user && (
              <div className='flex gap-10'>
                <div
                  className='flex flex-col items-center gap-2 hover:cursor-pointer'
                  onClick={() => toggleLike()}>
                  {data.isLiked ? (
                    <FullHeart className='w-27 h-27 aspect-square' />
                  ) : (
                    <EmptyHeart className='w-27 h-27 aspect-square stroke-2 stroke-black' />
                  )}
                  <p className='text-[#000] text-center font-roboto text-sm font-medium leading-[110%]'>
                    {data.likeCount}
                  </p>
                </div>

                <div
                  className='flex flex-col items-center gap-2 hover:cursor-pointer'
                  onClick={() => toggleScrap()}>
                  {data.isScraped ? (
                    <BookMark className='text-secondary w-27 h-27 aspect-square' />
                  ) : (
                    <BookMark className='w-27 h-27 aspect-square' />
                  )}
                  <p className='text-[#000] text-center font-roboto text-sm font-medium leading-[110%]'>
                    {data.scrapCount}
                  </p>
                </div>
              </div>
            )}
            <Share
              onClick={handleShareClick}
              className='fill-[#21272a] w-32 h-27 aspect-square hover:cursor-pointer'
            />
          </div>

          {/* 매거진 컨텐츠 */}
          <p>{data.content}</p>

          {/* 매거진 태그 */}
          <div className='flex gap-10'>
            <PlayTag text={data.category} />
          </div>
        </div>
      </div>

      {/* 추천 매거진 */}
      <div className='mt-10 rounded-[20px] bg-white flex flex-col px-5 py-18 gap-10'>
        <h1 className='p-10 text-black font-roboto text-2xl font-bold leading-[110%]'>
          추천 매거진
        </h1>
        <div className='flex overflow-x-auto'>
          <ul className='flex p-10 gap-20' ref={listWrapperRef}>
            {recommendedMagazines?.map((sub: SubMagazinePostType) => (
              <SubMagazine
                key={sub.id}
                magazine={{
                  id: sub.id,
                  title: sub.title,
                  imageUrl: sub.imageUrl,
                  category: sub.category,
                  isScraped: sub.isScraped,
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MagazineDetailPage;
