import { Route } from 'react-router-dom';

import Main from '../pages/home/Main';
import Login from '../pages/auth/Login';
import SignupMentor from '../pages/auth/signupmentor'; // 멘토 회원가입입
import ResetPassword from '../pages/auth/ResetPassword'; // 비밀번호 재설정
import VerifyMentor from '../pages/auth/VerifyMentor'; // 본인인증증
import SignupMentee from '../pages/auth/signupmentee'; // 멘티 회원가입

import VerifyUser from '../pages/auth/VerifyUser';

const SignupRoutes = (
  <>
    <Route index element={<Main />} /> {/* "/" 경로일 때 메인 */}
    
    {/* Auth */}
    <Route path="login" element={<Login />} />
    <Route path="/SignupMentor" element={<SignupMentor />} />
    <Route path="password/reset" element={<ResetPassword />} />
    <Route path="mentor/verify" element={<VerifyMentor />} />
    <Route path="/SignupMentee" element={<SignupMentee />} />
    <Route path="password/verify" element={<VerifyUser />} />
  </>
);

export default SignupRoutes;
