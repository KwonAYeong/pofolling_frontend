// routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/layout/Layout';

// 페이지별 라우트 묶음
import CommunityRoutes from './community';
import EditRoutes from './edit';
import MypageRoutes from './mypage';
import SignupRoutes from './signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {CommunityRoutes}
        {EditRoutes}
        {MypageRoutes}
        {SignupRoutes}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
