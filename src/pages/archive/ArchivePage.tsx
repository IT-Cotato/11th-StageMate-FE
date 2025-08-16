import ArchiveCalendar from '@/components/archive/ArchiveCalendar';
import ScrappedMagazine from '@/components/archive/ScrappedMagazine';
import TopRatedShowList from '@/components/archive/TopRatedShowList';
import PostListItem from '@/components/community/post/PostListItem';
import LoadMoreButton from '@/components/global/LoadMoreButton';
import {mockPosts} from '@/mocks/mockPosts';
import {useAuthStore} from '@/stores/authStore';
import {useCalendarStore} from '@/stores/useCalendarStore';
import {useNavigate} from 'react-router-dom';

const ArchivePage = () => {
  const filteredPost = mockPosts.filter((post) => post.isScrapped);
  const navigate = useNavigate();
  const {user} = useAuthStore();
  const {month} = useCalendarStore();

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
          <LoadMoreButton onClick={() => navigate('/scrap-magazine')} />
        </div>
        <ScrappedMagazine />
      </div>

      <div className='flex flex-col gap-20'>
        <div className='flex flex-row justify-between items-end'>
          <span className='font-bold text-[23px]'>내가 스크랩한 글</span>
          <LoadMoreButton onClick={() => navigate('/scrap-post')} />
        </div>

        <div className='flex flex-col mt-[22px] gap-[19px]'>
          {filteredPost.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
