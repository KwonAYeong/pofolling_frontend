import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatch, setIsMatch] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert('비밀번호를 모두 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setIsMatch(false);
      return;
    }

    // 실제 비밀번호 업데이트 로직 (API 호출 등)
    alert('비밀번호가 재설정되었습니다!');
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-xl font-semibold mb-8">비밀번호 재설정</h2>
      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col gap-4"
      >
        <input
          type="password"
          placeholder="새 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border bg-gray-200"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setIsMatch(true); // 입력 중일 땐 경고 숨김
          }}
          className="px-4 py-2 border bg-gray-200"
        />
        {!isMatch && (
          <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
        )}
        <button
          type="submit"
          className="bg-gray-300 px-4 py-2 mt-2 hover:bg-gray-400 transition"
        >
          확인
        </button>
      </form>
    </div>
  );
}
