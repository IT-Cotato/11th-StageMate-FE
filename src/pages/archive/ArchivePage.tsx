import ArchiveCalendar from '@/components/archive/ArchiveCalendar';
import ScrappedMagazine from '@/components/archive/ScrappedMagazine';
import TopRatedShowList from '@/components/archive/TopRatedShowList';
import PostListItem from '@/components/community/post/PostListItem';
import {mockPosts} from '@/mocks/mockPosts';
import {useNavigate} from 'react-router-dom';

const ArchivePage = () => {
  const filteredPost = mockPosts.filter((post) => post.isScrapped);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-50 sm:px-5 px-10'>
      <h1 className='text-[25px] font-bold'>나의 공연 아카이빙</h1>
      <ArchiveCalendar />
      <div className='flex flex-col gap-20'>
        <span className='font-bold text-[23px]'>
          @@ 님의 5월 공연 평점 순위
        </span>
        <TopRatedShowList />
      </div>
      <div className='flex flex-col gap-20'>
        <span className='font-bold text-[23px]'>내가 스크랩한 매거진</span>
        <ScrappedMagazine />
      </div>
      <div className='flex justify-center'>
        <button
          className='w-100 flex justify-center items-center text-[18px] border-primary border-[1px] rounded-[50px] px-21 py-3 hover:bg-gray-100 hover:font-semibold cursor-pointer'
          onClick={() => navigate('/archive/scrap-magazine')}>
          더 보기
        </button>
      </div>
      <div className='flex flex-col gap-20'>
        <span className='font-bold text-[23px]'>내가 스크랩한 글</span>

        <div className='flex flex-col mt-[22px] gap-[19px]'>
          {filteredPost.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className='flex justify-center'>
        <button
          className='w-100 flex justify-center items-center text-[18px] border-primary border-[1px] rounded-[50px] px-21 py-3 hover:bg-gray-100 hover:font-semibold cursor-pointer'
          onClick={() => navigate('/archive/scrap-post')}>
          더 보기
        </button>
      </div>
    </div>
  );
};

export default ArchivePage;
