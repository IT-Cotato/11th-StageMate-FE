import ChatRoomList from '@/components/community/chat/ChatRoomList';
import SharePostList from '@/components/community/post/SharePostList';
import PostList from '@/components/community/post/PostList';
import School from '@/assets/community/tip-post-school.svg?react';
import Rocket from '@/assets/community/hot-post-rocket.svg?react';
import MusicalNote from '@/assets/community/daily-post-musical-note.svg?react';
import PlayMagazine from '@/components/community/magazine/PlayMagazine';

const CommunityMainPage = () => {
  return (
    <div className='flex flex-col gap-30 mb-12 px-32'>
      {/** hot 게시물 */}
      <PostList icon={<Rocket />} title='HOT 게시물' variant='hot' />

      {/** 나눔 거래 게시판 */}
      <SharePostList />

      {/** 실시간 채팅방 */}
      <ChatRoomList />

      {/** 일상 게시물 */}
      <PostList icon={<MusicalNote />} title='일상 게시물' variant='daily' />

      {/** 꿀팁 게시물 */}
      <PostList icon={<School />} title='꿀팁 게시물' variant='tip' />

      {/** 공연 매거진 */}
      <PlayMagazine />
    </div>
  );
};

export default CommunityMainPage;
