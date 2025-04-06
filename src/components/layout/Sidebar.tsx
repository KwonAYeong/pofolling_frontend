// src/components/layout/Sidebar.tsx

import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    { label: '내 활동', path: '/mypage/activity' },
    { label: '내 포트폴리오', path: '/mypage/portfolio' },
    { label: '멘토링 요청', path: '/mentoring/request' },
    { label: '커뮤니티', path: '/community' },
    { label: '채용', path: '/recruit' },
  ];

  return (
    <aside className="w-52 bg-gray-100 h-full py-6 px-4 border-r">
      <nav className="flex flex-col space-y-3">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={clsx(
              'text-sm px-3 py-2 rounded hover:bg-gray-200',
              location.pathname.startsWith(menu.path) && 'bg-white shadow text-blue-500 font-semibold'
            )}
          >
            {menu.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
