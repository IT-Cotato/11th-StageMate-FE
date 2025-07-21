import ChatRoomList from '@/components/community/chat/ChatRoomList';
import SharePostList from '@/components/community/post/SharePostList';
import PostList from '@/components/community/post/PostList';
import {mockPosts} from '@/mocks/mockPosts';
import School from '@/assets/community/tip-post-school.svg?react';
import Rocket from '@/assets/community/hot-post-rocket.svg?react';
import MusicalNote from '@/assets/community/daily-post-musical-note.svg?react';
import PlayMagazine from '@/components/community/magazine/PlayMagazine';

const CommunityMainPage = () => {
  return (
    <div className='flex flex-col gap-30 mb-12'>
      {/** hot 게시물 */}
      <PostList
        icon={<Rocket />}
        title='HOT 게시물'
        posts={mockPosts}
        onLoadMoreClick={() => console.log('핫 게시물 더보기 버튼 클릭시 동작')}
        variant='hot'
      />

      {/** 나눔 거래 게시판 */}
      <SharePostList />

      {/** 실시간 채팅방 */}
      <ChatRoomList />

      {/** 일상 게시물 */}
      <PostList
        icon={<MusicalNote />}
        title='일상 게시물'
        posts={mockPosts.filter((post) => post.category === '일상')}
        onLoadMoreClick={() =>
          console.log('일상 게시물 더보기 버튼 클릭시 동작')
        }
        variant='daily'
      />

      {/** 꿀팁 게시물 */}
      <PostList
        icon={<School />}
        title='꿀팁 게시물'
        posts={mockPosts.filter((post) => post.category === '꿀팁')}
        onLoadMoreClick={() =>
          console.log('꿀팁 게시물 더보기 버튼 클릭시 동작')
        }
        variant='tip'
      />

      {/** 공연 매거진 */}
      <PlayMagazine />
    </div>
  );
};

export default CommunityMainPage;
