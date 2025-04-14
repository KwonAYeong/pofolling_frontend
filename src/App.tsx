import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { UserProvider } from '../src/context/UserContext';
import { MentoringProvider } from '../src/context/MentoringContext'; // 👈 추가!

const App = () => {
  return (
    <UserProvider> {/* ✅ 전역 유저 상태 */}
      <MentoringProvider> {/* ✅ 첨삭 요청 전역 상태 */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MentoringProvider>
    </UserProvider>
  );
};

export default App;
