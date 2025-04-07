import { Routes, Route } from 'react-router-dom';

import MyPage from '../pages/mypage/MyPage';
import EditProfile from '../pages/mypage/EditProfile';
import Activity from '../pages/mypage/Activity';
import MyPortfolio from '../pages/mypage/portfolio/MyPortfolio';
import PortfolioDetailMentee from '../pages/mypage/portfolio/MyPofolDetail';
import PortfolioEdit from '../pages/mypage/portfolio/MyPortfolioEdit';

const Mypage = () => {
    return (
      <Routes>
      {/* Mypage */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/edit" element={<EditProfile />} />
      <Route path="/mypage/activity" element={<Activity />} />
      <Route path="/mypage/portfolio" element={<MyPortfolio />} />
      <Route path="/mypage/portfolio/:id" element={<PortfolioDetailMentee />} />
      <Route path="/mypage/portfolio/edit/:id" element={<PortfolioEdit />} />
    </Routes>
  );
};

export default Mypage;