import ArchiveCalendar from '@/components/archive/ArchiveCalendar';
import ScrappedMagazineList from '@/components/archive/ScrappedMagazineList';
import TopRatedShowList from '@/components/archive/TopRatedShowList';
import PostListItem from '@/components/community/post/PostListItem';
import {mockPosts} from '@/mocks/mockPosts';

const ArchivePage = () => {
  const filteredPost = mockPosts.filter((post) => post.isScrapped);
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
        <ScrappedMagazineList />
      </div>
      <div className='flex justify-center'>
        <div className='w-100 flex justify-center items-center text-[18px] border-primary border-[1px] rounded-[50px] px-21 py-3 hover:bg-gray-100 hover:font-semibold cursor-pointer'>
          더 보기
        </div>
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
        <div className='w-100 flex justify-center items-center text-[18px] border-primary border-[1px] rounded-[50px] px-21 py-3 hover:bg-gray-100 hover:font-semibold cursor-pointer'>
          더 보기
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
