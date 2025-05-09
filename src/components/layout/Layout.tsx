// Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUser } from '../../context/UserContext';
import { mypageSidebarMenu } from '../../utils/sidebarMenus';
import ChatButton from 'components/common/ChatButton';

const Layout = () => {
  const { pathname } = useLocation();
  const { user } = useUser();
  const isMypage = pathname.startsWith('/mypage');
  const isChatPage = pathname.startsWith('/chat'); // 추가된 부분
  const sidebarMenu =
    isMypage && user ? mypageSidebarMenu(user.role) : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {sidebarMenu.length > 0 && <Sidebar menu={sidebarMenu} />}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      {!isChatPage && <ChatButton />} {/* 채팅 페이지에서는 안보이게 조건 추가 */}
    </div>
  );
};

export default Layout;