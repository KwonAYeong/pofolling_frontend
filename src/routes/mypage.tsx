import { Route } from 'react-router-dom';

import MyPage from '../pages/mypage/profile/MyPage';
import EditProfile from '../pages/mypage/profile/ProfileUpdate';
import Activity from '../pages/mypage/MyActivity';
import MyPortfolio from '../pages/mypage/myPortfolio/MyPortfolioList';
import PortfolioDetailMentee from '../pages/mypage/myPortfolio/MyPofolDetail';
import UploadPortfolio from '../pages/mypage/myPortfolio/MyPortfolioCreate';
import PortfolioEdit from '../pages/mypage/myPortfolio/MyPortfolioUpdate';

const MypageRoutes = (
  <>
    {/* Mypage */}
    <Route path="mypage" element={<MyPage />} />
    <Route path="mypage/edit" element={<EditProfile />} />
    <Route path="mypage/activity" element={<Activity />} />
    <Route path="mypage/portfolio" element={<MyPortfolio />} />
    <Route path="mypage/portfolio/upload" element={<UploadPortfolio />} />
    <Route path="mypage/portfolio/:id" element={<PortfolioDetailMentee />} />
    <Route path="mypage/portfolio/edit/:id" element={<PortfolioEdit />} />
  </>
);

export default MypageRoutes;
