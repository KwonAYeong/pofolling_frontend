// layout/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { dummyUser } from '../../lib/dummyUser';
import { mypageSidebarMenu } from '../../utils/sidebarMenus';

const Layout = () => {
  const { pathname } = useLocation();
  const isMypage = pathname.startsWith('/mypage');
  const sidebarMenu =
  isMypage && dummyUser ? mypageSidebarMenu(dummyUser.role) : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
      {sidebarMenu.length > 0 && <Sidebar menu={sidebarMenu} />}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
