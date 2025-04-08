// 로그인/로그아웃 상태 분기 + 멘토/멘티 테두리 색상
import { Link, useNavigate } from 'react-router-dom';
import { dummyUser } from '../../lib/dummyUser';
import NotificationBell from './NotificationBell';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!dummyUser; //로그인 유무
  const profileBorderColor =
    dummyUser?.role === 'MENTOR' ? 'border-mentor' : 'border-mentee'; // 멘토 멘티 색

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
        {isLoggedIn ? (
          <>
            <NotificationBell />
            <button
              onClick={() => navigate('/mypage')}
              className={`w-8 h-8 rounded-full overflow-hidden border-2 ${profileBorderColor}`}
            >
              <img
                src="/profileEX.png" // 프로필 사진 일단 예시
                alt="profile"
                className="w-full h-full object-cover"
              />
            </button>
          </>
        ) : (
          <>
          {/*마우스 들어올 시 파란색으로 변경*/}
            <Link to="/login" className="text-sm hover:text-blue-600">로그인</Link>
            <Link to="/signup" className="text-sm hover:text-blue-600">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
