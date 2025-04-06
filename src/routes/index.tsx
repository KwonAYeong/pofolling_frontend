import { Routes, Route } from 'react-router-dom';

import Main from '../pages/home/Main';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyMentor from '../pages/auth/VerifyMentor';

import MyPage from '../pages/mypage/MyPage';
import EditProfile from '../pages/mypage/EditProfile';
import Activity from '../pages/mypage/Activity';
import MyPortfolio from '../pages/mypage/portfolio/MyPortfolio';
import PortfolioDetailMentee from '../pages/mypage/portfolio/Detail';
import PortfolioEdit from '../pages/mypage/portfolio/Edit';

import UploadPortfolio from '../pages/mentoring/portfolio/Upload';
import PortfolioDetailMentor from '../pages/mentoring/portfolio/Detail';
import Request from '../pages/mentoring/Request';
import RequestList from '../pages/mentoring/RequestList';
import Chat from '../pages/mentoring/Chat';

import CommunityList from '../pages/community/List';
import CommunityDetail from '../pages/community/Detail';
import CommunityWrite from '../pages/community/Write';

import RecruitList from '../pages/recruit/List';
import RecruitDetail from '../pages/recruit/Detail';
import Calendar from '../pages/recruit/Calendar';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/reset" element={<ResetPassword />} />
      <Route path="/mentor/verify" element={<VerifyMentor />} />

      {/* Mypage */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/edit" element={<EditProfile />} />
      <Route path="/mypage/activity" element={<Activity />} />
      <Route path="/mypage/portfolio" element={<MyPortfolio />} />
      <Route path="/mypage/portfolio/:id" element={<PortfolioDetailMentee />} />
      <Route path="/mypage/portfolio/edit/:id" element={<PortfolioEdit />} />

      {/* Mentoring */}
      <Route path="/mentoring/portfolio/upload" element={<UploadPortfolio />} />
      <Route path="/mentoring/portfolio/:id" element={<PortfolioDetailMentor />} />
      <Route path="/mentoring/request" element={<Request />} />
      <Route path="/mentoring/list" element={<RequestList />} />
      <Route path="/mentoring/chat/:id" element={<Chat />} />

      {/* Community */}
      <Route path="/community" element={<CommunityList />} />
      <Route path="/community/:id" element={<CommunityDetail />} />
      <Route path="/community/write" element={<CommunityWrite />} />

      {/* Recruit */}
      <Route path="/recruit" element={<RecruitList />} />
      <Route path="/recruit/:id" element={<RecruitDetail />} />
      <Route path="/recruit/calendar" element={<Calendar />} />
    </Routes>
  );
};

export default AppRouter;
