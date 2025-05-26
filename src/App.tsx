import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { UserProvider } from '../src/context/UserContext';

const App = () => {
  return (
    <UserProvider> {/* ✅ 전역 유저 상태 */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
    </UserProvider>
  );
};

export default App;
