import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet /> {/* ← 여기서 각 페이지 컴포넌트들이 표시됨 */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
