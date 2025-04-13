import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { UserProvider } from '../src/context/UserContext'; // ✅ 꼭 추가!

const App = () => {
  return (
    <UserProvider> {/* ✅ 전체 앱을 UserProvider로 감싼다 */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
