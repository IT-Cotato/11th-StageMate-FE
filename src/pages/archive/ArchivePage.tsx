import ArchiveCalendar from '@/components/archive/ArchiveCalendar';
import ScrappedMagazine from '@/components/archive/ScrappedMagazine';
import TopRatedShowList from '@/components/archive/TopRatedShowList';
import PostListItem from '@/components/community/post/PostListItem';
import LoadMoreButton from '@/components/global/LoadMoreButton';
import {useUserCommunities, useUserMagazines} from '@/hooks/useUserContents';
import {useAuthStore} from '@/stores/authStore';
import {useCalendarStore} from '@/stores/useCalendarStore';
import {useNavigate} from 'react-router-dom';
import '@/styles/skeleton.css';
import useCommunityNavigation from '@/hooks/useCommunityNavigation';

const ArchivePage = () => {
  const navigate = useNavigate();
  const {user} = useAuthStore();
  const {month} = useCalendarStore();
  const {goToPostDetail} = useCommunityNavigation();

  // 호출: 상위 4개 매거진
  const {
    data: magazinesData,
    isLoading: magLoading,
    isError: magError,
  } = useUserMagazines(1, 4);
  const magazines = magazinesData?.data.list ?? [];

  // 호출: 상위 4개 스크랩 글
  const {
    data: postsData,
    isLoading: postLoading,
    isError: postError,
  } = useUserCommunities(1, 4);
  const posts = postsData?.data.list ?? [];

  return (
    <div className='flex flex-col gap-50 sm:px-5 px-10'>
      <h1 className='text-[25px] font-bold'>나의 공연 아카이빙</h1>
      <ArchiveCalendar />
      <div className='flex flex-col gap-20'>
        <span className='font-bold text-[23px]'>
          {user?.name} 님의 {month}월 공연 평점 순위
        </span>
        <TopRatedShowList />
      </div>
      <div className='flex flex-col gap-20'>
        <div className='flex flex-row justify-between items-end'>
          <span className='font-bold text-[23px]'>내가 스크랩한 매거진</span>
          {magazines.length > 0 && (
            <LoadMoreButton onClick={() => navigate('/scrap-magazine')} />
          )}
        </div>

        {magLoading ? (
          <div className='flex gap-20 overflow-x-auto'>
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className='w-[160px] h-[250px] rounded-lg skeleton-shimmer'
              />
            ))}
          </div>
        ) : magError ? (
          <div className='text-red text-sm justify-center'>
            스크랩한 매거진을 불러오지 못했습니다.
          </div>
        ) : magazines.length === 0 ? (
          <div className='text-gray-2 text-sm text-center'>
            스크랩한 매거진이 없습니다.
          </div>
        ) : (
          <ScrappedMagazine magazines={magazines} />
        )}
      </div>

      <div className='flex flex-col gap-20'>
        <div className='flex flex-row justify-between items-end'>
          <span className='font-bold text-[23px]'>내가 스크랩한 글</span>
          {posts.length > 0 && (
            <LoadMoreButton onClick={() => navigate('/scrap-post')} />
          )}
        </div>

        <div className='flex flex-col gap-15'>
          {postLoading ? (
            [...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className='w-full h-[80px] rounded-lg skeleton-shimmer'
              />
            ))
          ) : postError ? (
            <div className='text-sm text-red justify-center'>
              스크랩한 글을 불러오지 못했습니다.
            </div>
          ) : posts.length === 0 ? (
            <div className='text-gray-2 text-sm text-center'>
              스크랩한 글이 없습니다.
            </div>
          ) : (
            posts.map((post) => (
              <PostListItem
                key={post.id}
                post={post}
                onClick={() => goToPostDetail(post.category, post.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
