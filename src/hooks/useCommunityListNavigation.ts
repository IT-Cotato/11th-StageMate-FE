import {useNavigate} from 'react-router-dom';

const useCommunityListNavigation = () => {
  const navigate = useNavigate();

  const goToCommunityCategory = (category: string) => {
    navigate(`/community/${category}`);
  };

  const goToMagazineList = () => {
    navigate('/magazine');
  };

  const goToShareList = () => {
    navigate('/community/share');
  };

  const goToChatRoomList = () => {
    navigate('/chat');
  };

  return {
    goToCommunityCategory,
    goToMagazineList,
    goToShareList,
    goToChatRoomList,
  };
};

export default useCommunityListNavigation;
