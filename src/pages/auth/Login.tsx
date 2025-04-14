// pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import { useUser } from 'context/UserContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, dummyUsers } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'test@example.com' && password === '1234') {
      const matchedUser = dummyUsers.find(u => u.nickname === 'kay') || null;
      setUser(matchedUser);
      navigate('/mypage');
    } else {
      alert('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium"
        >
          로그인
        </button>

        {/* 소셜 로그인 버튼 */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-red-500 text-white w-10 h-10 rounded-full">G</button>
          <button className="bg-yellow-400 text-white w-10 h-10 rounded-full">K</button>
        </div>

        {/* 추가 링크들 */}
        <div className="mt-6 flex justify-between text-sm text-blue-500 font-medium">
          <button onClick={() => navigate('/Signupmentee')}
            className="px-6 py-2 bg-green-500 text-white rounded">멘티 가입하기</button>
          <button onClick={() => navigate('/password/verify')}>비밀번호 찾기</button>
          <button onClick={() => navigate('/SignupMentor')}
            className="px-6 py-2 bg-blue-500 text-white rounded">멘토 가입하기</button>
        </div>
      </div>
    </div>
  );
}