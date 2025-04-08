import { Route } from 'react-router-dom';

import RecruitList from '../pages/recruit/RecruitList';
import RecruitDetail from '../pages/recruit/RecruitDetail';
import Calendar from '../pages/recruit/RecruitCalendar';

const RecruitRoutes = (
  <>
    {/* Recruit */}
    <Route path="recruit" element={<RecruitList />} />
    <Route path="recruit/calendar" element={<Calendar />} />
    <Route path="recruit/:id" element={<RecruitDetail />} />
  </>
);

export default RecruitRoutes;
