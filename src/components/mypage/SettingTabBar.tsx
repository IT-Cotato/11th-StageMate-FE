import {NavLink} from 'react-router-dom';

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
  return (
    <div className='w-full'>
      {/* tab line */}
      <div className='w-full h-2 bg-gray-3 relative'>
        <div className='w-1/3 h-2 bg-secondary absolute' />
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
