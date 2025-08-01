import ChatRoomList from '@/components/community/chat/ChatRoomList';
import SharePostList from '@/components/community/post/SharePostList';
import PostList from '@/components/community/post/PostList';
import {mockPosts} from '@/mocks/mockPosts';
import School from '@/assets/community/tip-post-school.svg?react';
import Rocket from '@/assets/community/hot-post-rocket.svg?react';
import MusicalNote from '@/assets/community/daily-post-musical-note.svg?react';
import PlayMagazine from '@/components/community/magazine/PlayMagazine';
import useCommunityListNavigation from '@/hooks/useCommunityListNavigation';

const CommunityMainPage = () => {
  const {goToCommunityCategory} = useCommunityListNavigation();

  return (
    <div className='flex flex-col gap-30 mb-12'>
      {/** hot 게시물 */}
      <PostList
        icon={<Rocket />}
        title='HOT 게시물'
        posts={mockPosts}
        variant='hot'
        onClick={() => goToCommunityCategory('hot')}
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
        variant='daily'
        onClick={() => goToCommunityCategory('daily')}
      />

      {/** 꿀팁 게시물 */}
      <PostList
        icon={<School />}
        title='꿀팁 게시물'
        posts={mockPosts.filter((post) => post.category === '꿀팁')}
        variant='tip'
        onClick={() => goToCommunityCategory('tip')}
      />

      {/** 공연 매거진 */}
      <PlayMagazine />
    </div>
  );
};

export default CommunityMainPage;
