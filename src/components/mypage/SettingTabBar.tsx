import {NavLink, useLocation} from 'react-router-dom';

const TabMenu = [
  {
    name: '계정 정보',
    path: '/settings/account',
  },
  {
    name: '내 활동',
    path: '/settings/activity',
  },
  {
    name: '이용 안내',
    path: '/settings/support',
  },
];

const SettingTabBar = () => {
  const location = useLocation();

  /**
   * 현재 TabMenu 경로가 TabMenu의 몇 번째 index인지 반환하는 함수
   */
  const getCurrentIndex = () => {
    const currentPath = location.pathname;
    return TabMenu.findIndex((menu) => menu.path === currentPath);
  };

  const activeIndex = getCurrentIndex();
  const translateX = activeIndex >= 0 ? (activeIndex * 100) / 3 : 0;

  return (
    <div className='w-full'>
      {/* tab line */}
      <div className='w-full h-2 mb-8 bg-gray-3 relative'>
        <div
          className={`w-1/3 h-2 bg-secondary absolute transition-all duration-300 ease-in-out`}
          style={{left: `${translateX}%`}}
        />
      </div>

      {/* menu */}
      <div className='w-full flex'>
        {TabMenu.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({isActive}) =>
              `w-1/3 ${isActive ? 'text-[#000]' : 'text-gray-2'}`
            }>
            <p className='text-2xl font-medium leading-[140%] text-center'>
              {menu.name}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SettingTabBar;
