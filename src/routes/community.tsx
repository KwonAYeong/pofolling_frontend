import { Routes, Route } from 'react-router-dom';

import CommunityList from '../pages/community/CommunityList';
import CommunityDetail from '../pages/community/CommunityDetail';
import CommunityWrite from '../pages/community/CommunityWrite';


const Community = () => {
    return (
      <Routes>
    {/* Community */}
    <Route path="/community" element={<CommunityList />} />
      <Route path="/community/:id" element={<CommunityDetail />} />
      <Route path="/community/write" element={<CommunityWrite />} />
    </Routes>
  );
};

export default Community;
