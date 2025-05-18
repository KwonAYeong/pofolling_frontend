import { Route } from 'react-router-dom';

import PortfolioDetailMentor from '../pages/edit/ResponseDetail';
import Request from '../pages/edit/Request';
import Cancel from '../pages/edit/Cancel';
import Resoponse from '../pages/edit/Response';
import Chat from '../pages/chat/Chat';

const EditRoutes = (
  <>
    {/* edit */}
    <Route path="edit-response/:id" element={<PortfolioDetailMentor />} />
    <Route path="edit-request" element={<Request />} />
    <Route path="edit-cancel" element={<Cancel />} />
    <Route path="edit-response" element={<Resoponse />} />
    {/* chat */}
    <Route path="chat" element={<Chat />} />
  </>
);

export default EditRoutes;
