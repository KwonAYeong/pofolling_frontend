import { Routes, Route } from 'react-router-dom';

import RecruitList from '../pages/recruit/RecruitList';
import RecruitDetail from '../pages/recruit/RecruitDetail';
import Calendar from '../pages/recruit/RecruitCalendar';


const Recruit = () => {
    return (
      <Routes>
      {/* Recruit */}
      <Route path="/recruit" element={<RecruitList />} />
    <Route path="/recruit/calendar" element={<Calendar />} /> {}
     <Route path="/recruit/:id" element={<RecruitDetail />} />
    </Routes>
  );
};

export default Recruit;
