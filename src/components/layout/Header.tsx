// 로그인/로그아웃 상태 분기 + 멘토/멘티 테두리 색상
import { Link, useNavigate } from 'react-router-dom';
import { dummyUser } from '../../lib/dummyUser';
import NotificationBell from './NotificationBell';
import UserBadge from 'components/common/UserBadge';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!dummyUser; //로그인 유무

    // 현재 가상 로그아웃 :: 실제 로그아웃 처리 로직으로 대체
    const handleLogout = () => {
      alert('로그아웃 처리 예정');
      // 예: setUser(null); navigate('/login');
    };
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* 왼쪽 로고 */}
      <Link to="/" className="text-xl font-bold">로고</Link>

      {/* 중앙 메뉴 마우스 들어올 시 파란색으로 변경*/}
      <nav className="space-x-6 text-sm font-medium">
        <Link to="/edit/list" className="hover:text-blue-600">첨삭</Link>
        <Link to="/community" className="hover:text-blue-600">커뮤니티</Link>
        <Link to="/recruit" className="hover:text-blue-600">채용정보</Link>
      </nav>

      {/* 오른쪽 - 로그인 상태/비로그인 상태 분기 */}
      <div className="flex items-center space-x-4">
      {isLoggedIn && dummyUser ? (
          <>
            <NotificationBell />
            <button
              onClick={() => navigate('/mypage')}
              className="flex items-center gap-2 group"
            >
              <UserBadge
                role={dummyUser.role}
                src="/profileEX.png"
                className="w-8 h-8"
              />
            </button>
                {/* 로그아웃 버튼 */}
                <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-mentee"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
          {/*마우스 들어올 시 파란색으로 변경*/}
            <Link to="/login" className="text-sm hover:text-mentee">로그인</Link>
            <Link to="/signup" className="text-sm hover:text-mentee">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
