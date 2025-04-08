import { Routes, Route } from 'react-router-dom';

import MyPage from '../pages/mypage/profile/MyPage';
import EditProfile from '../pages/mypage/profile/ProfileUpdate';
import Activity from '../pages/mypage/Activity';
import MyPortfolio from '../pages/mypage/myPortfolio/MyPortfolioList';
import PortfolioDetailMentee from '../pages/mypage/myPortfolio/MyPofolDetail';
import PortfolioEdit from '../pages/mypage/myPortfolio/MyPortfolioUpdate';

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