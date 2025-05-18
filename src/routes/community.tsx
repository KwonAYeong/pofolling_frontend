import { Route } from 'react-router-dom';

import CommunityList from '../pages/community/CommunityList';
import CommunityDetail from '../pages/community/CommunityDetail';
import CommunityWrite from '../pages/community/CommunityWrite';

const CommunityRoutes = (
  <>
    <Route path="community" element={<CommunityList />} />
    <Route path="community/:postId" element={<CommunityDetail />} /> {/* ✅ postId로 변경 */}
    <Route path="community/write" element={<CommunityWrite />} />
  </>
);

export default CommunityRoutes;
