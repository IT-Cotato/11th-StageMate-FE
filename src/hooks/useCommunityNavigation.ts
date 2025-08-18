/**
 * 커뮤니티 내 게시글, 매거진, 거래글, 채팅방 클릭 시 공통 네비게이션 핸들러
 */

import {useNavigate} from 'react-router-dom';

const useCommunityNavigation = () => {
  const navigate = useNavigate();

  const goToPostDetail = (category: string, postId: number) => {
    navigate(`/community/${category}/${postId}`);
  };

  const goToShareDetail = (id: number) => {
    navigate(`/share/${id}`);
  };

  const goToMagazineDetail = (id: number) => {
    navigate(`/magazine/${id}`);
  };

  const goToChatRoomDetail = (
    id: number,
    title: string = '방 이름을 불러올 수 없습니다.'
  ) => {
    navigate(`/chatRoom/${id}`, {state: {title}});
  };

  return {
    goToPostDetail,
    goToShareDetail,
    goToMagazineDetail,
    goToChatRoomDetail,
  };
};

export default useCommunityNavigation;
