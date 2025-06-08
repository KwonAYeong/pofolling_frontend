import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUser } from '../../context/UserContext';
import { mypageSidebarMenu } from '../../utils/sidebarMenus';
import { editSidebarMenu } from '../../utils/editSidebarMenu'; 
import ChatButton from 'components/common/ChatButton';
import { MenuItem } from './Sidebar';

const Layout = () => {
  const { user } = useUser();
  const { pathname } = useLocation();

  const isMypage = pathname.startsWith('/mypage');
  const isEdit = pathname.startsWith('/edit');
  const isChatPage = pathname.startsWith('/chat');

  let sidebarMenu: MenuItem[] = [];

  if (isMypage && user) {
    sidebarMenu = mypageSidebarMenu(user.role);
  } else if (isEdit && user?.role === 'MENTEE') {
    sidebarMenu = editSidebarMenu;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {sidebarMenu.length > 0 && <Sidebar menu={sidebarMenu} />}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      {!isChatPage && <ChatButton />}
    </div>
  );
};

export default Layout;
