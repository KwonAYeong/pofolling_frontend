import { Link, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '../../context/UserContext';
import UserBadge from 'components/common/UserBadge';
import { useEffect, useState } from 'react';
import axios from 'api/axios';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const isLoggedIn = !!user;

  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  // 프로필 이미지만 별도로 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.user_id) return;
        const res = await axios.get(`/mypage/profile/${user.user_id}`);
        setProfileImage(res.data.profileImage);
      } catch (err) {
        console.error('헤더 프로필 불러오기 실패:', err);
      }
    };

    fetchProfile();
  }, [user?.user_id]);

  const handleEditClick = () => {
    const role: UserRole | undefined = user?.role;
    if (!role) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else if (role === 'MENTEE') {
      navigate('/edit-request');
    } else if (role === 'MENTOR') {
      navigate('/edit-response');
    }
  };

  const handleLogout = () => {
    setUser(null);
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <Link to="/" className="text-xl font-bold">
        <img src="/logo2.png" alt="로고" className="h-8 mr-2" />
      </Link>

      <nav className="space-x-6 text-sm font-medium">
        <button onClick={handleEditClick} className="hover:text-blue-600">첨삭</button>
        <Link to="/community" className="hover:text-blue-600">커뮤니티</Link>
      </nav>

      <div className="flex items-center space-x-4">
        {isLoggedIn && user ? (
          <>
            <button onClick={() => navigate('/mypage')} className="flex items-center gap-2 group">
              <UserBadge
                role={user.role}
                profileUrl={profileImage} // 여기만 로컬 상태 profileImage 사용
                className="w-8 h-8"
                hoverEffect
              />
            </button>
            <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-mentee">로그아웃</button>
          </>
        ) : (
          <Link to="/login" className="text-sm hover:text-mentee">로그인/회원가입</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
