import { Route } from 'react-router-dom';

import Main from '../pages/home/Main';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyMentor from '../pages/auth/VerifyMentor';

const SignupRoutes = (
  <>
    <Route index element={<Main />} /> {/* "/" 경로일 때 메인 */}
    
    {/* Auth */}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="password/reset" element={<ResetPassword />} />
    <Route path="mentor/verify" element={<VerifyMentor />} />
  </>
);

export default SignupRoutes;
