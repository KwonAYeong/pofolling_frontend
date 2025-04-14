import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

export default function VerifyUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate(); // ✅ 선언

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    // ✅ 다음 페이지로 이동
    navigate('/password/reset');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-xl font-semibold mb-8">본인 인증</h2>
      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border bg-gray-200"
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border bg-gray-200"
        />
        <input
          type="tel"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="px-4 py-2 border bg-gray-200"
        />
        <button
          type="submit"
          className="bg-gray-300 px-4 py-2 mt-2 hover:bg-gray-400 transition"
        >
          다음
        </button>
      </form>
    </div>
  );
}
