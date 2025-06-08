// routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/layout/Layout';

// 페이지별 라우트 묶음
import CommunityRoutes from './community';
import EditRoutes from './edit';
import MypageRoutes from './mypage';
import SignupRoutes from './signup';

// 카카오 리다이렉트 페이지 
import KakaoRedirect from '../pages/auth/KakaoRedirect';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 메인 레이아웃 기준 */}
      <Route path="/" element={<Layout />}>
        {CommunityRoutes}
        {EditRoutes}
        {MypageRoutes}
        {SignupRoutes}
      </Route>

      {/* 카카오 로그인 리다이렉트 전용 */}
      <Route path="/oauth/kakao" element={<KakaoRedirect />} />
    </Routes>
  );
};

export default AppRoutes;
