import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import { useUser } from 'context/UserContext';
import axios from 'axios';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, dummyUsers } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 카카오 SDK 초기화
  useEffect(() => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init('b15e0a5107527b89fc69d8997b6e1282'); 
    }
  }, []);

  const handleLogin = () => {
    if (email === 'test@example.com' && password === '1234') {
      const matchedUser = dummyUsers.find(u => u.nickname === 'kay') || null;
      setUser(matchedUser);
      navigate('/mypage');
    } else {
      alert('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth/kakao', // 프론트 전용 콜백 페이지
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        <Input type="email" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2 mb-4" />

        <Input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded px-3 py-2 mb-4" />

        <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4">로그인</button>

        {/* 카카오 로그인 버튼 */}
        <button onClick={handleKakaoLogin} className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500">카카오로 로그인</button>
      </div>
    </div>
  );
}
