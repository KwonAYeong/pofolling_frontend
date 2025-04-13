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
      setUser(matchedUser); // 👈 전역 상태에 유저 정보 저장
      navigate('/mypage');
    } else {
      alert('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <Input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        required
        className="w-80 border rounded px-3 py-2 mb-4"
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        required
        className="w-80 border rounded px-3 py-2 mb-4"
      />
      <button
        onClick={handleLogin}
        className="w-80 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium"
      >
        로그인
      </button>
    </div>
  );
}