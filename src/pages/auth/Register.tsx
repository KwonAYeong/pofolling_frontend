import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [job, setJob] = useState('');

  const handleSignup = () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 회원가입 로직
    alert('회원가입 성공!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-2xl font-bold mb-8">회원가입</h1>
      <div className="flex flex-col gap-3 w-[300px]">
        <input
          type="email"
          placeholder="이메일 (ex. example@gmail.com)"
          className="border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="이름 (ex. 김효민)"
          className="border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="닉네임"
            className="border rounded px-3 py-2 w-full"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className="border px-2 py-1">중복확인</button>
        </div>
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="border rounded px-3 py-2 w-full"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button className="border px-2 py-1">확인</button>
        </div>
        <input
          type="text"
          placeholder="전화번호 (ex. 010-0000-0000)"
          className="border rounded px-3 py-2"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        >
          <option value="">직무입력</option>
          <option value="frontend">프론트엔드</option>
          <option value="backend">백엔드</option>
          <option value="designer">디자이너</option>
          <option value="planner">기획자</option>
        </select>
        <button
          className="mt-4 border px-4 py-2 rounded hover:bg-gray-200"
          onClick={handleSignup}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
