import { Routes, Route } from 'react-router-dom';

import RecruitList from '../pages/recruit/List';
import RecruitDetail from '../pages/recruit/Detail';
import Calendar from '../pages/recruit/Calendar';


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
