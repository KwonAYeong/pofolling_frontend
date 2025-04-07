import { Routes, Route } from 'react-router-dom';

import Main from '../pages/home/Main';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyMentor from '../pages/auth/VerifyMentor';

const Signup = () => {
    return (
      <Routes>
      <Route path="/" element={<Main />} />

    {/* Auth */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/password/reset" element={<ResetPassword />} />
    <Route path="/mentor/verify" element={<VerifyMentor />} />
    </Routes>
  );
};

export default Signup;