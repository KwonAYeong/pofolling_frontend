import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'context/UserContext';
import axios from 'axios';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      axios
        .get(`http://localhost:8080/auth/kakao/callback?code=${code}`)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem('token', token);

          // JWT 기반 사용자 정보 가져오기
          axios.get('http://localhost:8080/api/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            setUser(response.data);
            navigate('/mypage');
          });
        })
        .catch((err) => {
          console.error('카카오 로그인 실패', err);
          alert('카카오 로그인 실패');
          navigate('/');
        });
    }
  }, [navigate, setUser]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirect;
