import { Route } from 'react-router-dom';

import MyPage from '../pages/mypage/profile/MyProfile';
import EditProfile from '../pages/mypage/profile/ProfileUpdate';
import Activity from '../pages/mypage/myActivity/MyActivity';
import MyPortfolioList from '../pages/mypage/myPortfolio/MyPortfolioList';
import MyPortfolioCreate from '../pages/mypage/myPortfolio/MyPortfolioCreate';
import MyPortfolioDetail from '../pages/mypage/myPortfolio/MyPofolDetail';
import MyPortfolioEdit from '../pages/mypage/myPortfolio/MyPortfolioUpdate';

const MypageRoutes = (
  <>
    {/* 마이페이지 프로필 관련 */}
    <Route path="mypage" element={<MyPage />} />
    <Route path="mypage/edit" element={<EditProfile />} />
    <Route path="mypage/activity" element={<Activity />} />

    {/* 포트폴리오 관련 */}
    <Route path="mypage/portfolio" element={<MyPortfolioList />} />
    <Route path="mypage/portfolio/create" element={<MyPortfolioCreate />} />
    <Route path="mypage/portfolio/detail/:id" element={<MyPortfolioDetail />} />
    <Route path="mypage/portfolio/edit/:id" element={<MyPortfolioEdit />} />
  </>
);

export default MypageRoutes;
