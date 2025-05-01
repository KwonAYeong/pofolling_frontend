// 로그인/로그아웃 상태 분기 + 멘토/멘티 테두리 색상
import { Link, useNavigate } from 'react-router-dom';
import { useUser,UserRole } from '../../context/UserContext';
import NotificationBell from './NotificationBell';
import UserBadge from 'components/common/UserBadge';

const Header = () => {
  const navigate = useNavigate();
  const { user,setUser } = useUser();
  const isLoggedIn = !!user; //로그인 유무

  const handleEditClick = () => {
    const role: UserRole | undefined = user?.role;
    if (!role) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else if (role === 'MENTEE') {
      navigate('/edit-requests');
    } else if (role === 'MENTOR') {
      navigate('/edit-response'); // 멘토용 페이지 경로
    }
  };


    const handleLogout = () => {
      setUser(null); // 전역 상태 초기화
      alert('로그아웃 되었습니다.');
      navigate('/login'); // 로그인 페이지로 이동
    };
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* 왼쪽 로고 */}
      <Link to="/" className="text-xl font-bold">
      <img src="/logo2.png" alt="로고" className="h-8 mr-2" />
      </Link>
      

      {/* 중앙 메뉴 마우스 들어올 시 파란색으로 변경*/}
      <nav className="space-x-6 text-sm font-medium">
        <button
          onClick={handleEditClick}
          className="hover:text-blue-600"
        >
          첨삭
          </button>
        <Link to="/community" className="hover:text-blue-600">커뮤니티</Link>
        <Link to="/recruit" className="hover:text-blue-600">채용정보</Link>
      </nav>

      {/* 오른쪽 - 로그인 상태/비로그인 상태 분기 */}
      <div className="flex items-center space-x-4">
      {isLoggedIn && user ? (
          <>
            <NotificationBell />
            <button
              onClick={() => navigate('/mypage')}
              className="flex items-center gap-2 group"
            >
              <UserBadge
                role={user.role}
                profileUrl="/profileEX.png"
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
            <Link to="/login" className="text-sm hover:text-mentee">로그인/회원가입</Link>
          </>
        )}
      </div>
    </header> 
  );
};

export default Header;
