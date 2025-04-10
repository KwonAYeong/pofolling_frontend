import { Route } from 'react-router-dom';

import UploadPortfolio from '../pages/mypage/myPortfolio/MyPortfolioCreate';
import PortfolioDetailMentor from '../pages/edit/RequestDetail';
import Request from '../pages/edit/Request';
import RequestList from '../pages/edit/RequestList';
import Chat from '../pages/chat/Chat';

const EditRoutes = (
  <>
    {/* edit */}
    <Route path="edit/portfolio/upload" element={<UploadPortfolio />} />
    <Route path="edit/portfolio/:id" element={<PortfolioDetailMentor />} />
    <Route path="edit/request" element={<Request />} />
    <Route path="edit/list" element={<RequestList />} />
    {/* chat */}
    <Route path="chat/:id" element={<Chat />} />
  </>
);

export default EditRoutes;
