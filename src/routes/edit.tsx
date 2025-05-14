import { Route } from 'react-router-dom';

import PortfolioDetailMentor from '../pages/edit/ResponseDetail';
import Request from '../pages/edit/Requests';
import Resoponse from '../pages/edit/Response';
import Chat from '../pages/chat/Chat';

const EditRoutes = (
  <>
    {/* edit */}
    <Route path="edit-response/:id" element={<PortfolioDetailMentor />} />
    <Route path="edit-requests" element={<Request />} />
    <Route path="edit-response" element={<Resoponse />} />
    {/* chat */}
    <Route path="chat" element={<Chat />} />
  </>
);

export default EditRoutes;
