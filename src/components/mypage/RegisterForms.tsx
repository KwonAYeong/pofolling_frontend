import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  role?: 'MENTOR' | 'MENTEE';
}

export default function RegisterForm({ role = 'MENTEE' }: RegisterFormProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const checkNicknameDuplicate = () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (nickname === 'taken') {
      alert('이미 사용 중인 닉네임입니다.');
      setIsNicknameChecked(false);
    } else {
      alert('사용 가능한 닉네임입니다.');
      setIsNicknameChecked(true);
    }
  };

  const checkPasswordMatch = () => {
    if (password && confirmPassword && password === confirmPassword) {
      alert('비밀번호가 일치합니다.');
      setIsPasswordConfirmed(true);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirmed(false);
    }
  };

  useEffect(() => {
    const allFilled =
      email.trim() &&
      name.trim() &&
      nickname.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      phone.trim() &&
      job.trim();

    setIsFormValid(!!allFilled && isNicknameChecked && isPasswordConfirmed);
  }, [email, name, nickname, password, confirmPassword, phone, job, isNicknameChecked, isPasswordConfirmed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    alert('회원가입 완료!');

    if (role === 'MENTOR') {
      navigate('/mentor/verify');
    } else {
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm mx-auto">
      <label>
        이메일
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="이메일 (ex. example@gmail.com)"
        />
      </label>

      <label>
        이름
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="이름 (ex. 김효민)"
        />
      </label>

      {/* 닉네임 + 중복확인 버튼 */}
            <label>
        닉네임
        <div className="relative w-full">
            <input
            value={nickname}
            onChange={(e) => {
                setNickname(e.target.value);
                setIsNicknameChecked(false);
            }}
            className="w-full border rounded px-3 py-2 pr-[80px]"
            placeholder="닉네임"
            />
            <button
            type="button"
            onClick={checkNicknameDuplicate}
            className="absolute top-1/2 right-2 -translate-y-1/2 px-2 py-1 text-sm bg-transparent text-gray-700"
            >
            중복확인
            </button>
        </div>
        </label>




      <label>
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsPasswordConfirmed(false);
          }}
          className="w-full border rounded px-3 py-2"
          placeholder="비밀번호 입력"
        />
      </label>

      {/* 비밀번호 확인 + 확인 버튼 */}
      <label>
        비밀번호 확인
        <div className="relative w-full">
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
                setConfirmPassword(e.target.value);
                setIsPasswordConfirmed(false);
            }}
            className="w-full border rounded px-3 py-2 pr-[60px]"
            placeholder="비밀번호 확인"
            />
            <button
            type="button"
            onClick={checkPasswordMatch}
            className="absolute top-1/2 right-2 -translate-y-1/2 px-2 py-1 text-sm bg-transparent text-gray-700"
            >
            확인
            </button>
        </div>
        </label>


      <label>
        전화번호
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="전화번호 (ex. 010-0000-0000)"
        />
      </label>

      <label>
        직무
        <select
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">직무입력</option>
          <option value="frontend">프론트엔드</option>
          <option value="backend">백엔드</option>
          <option value="designer">디자이너</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`mt-6 border px-4 py-2 rounded text-center font-medium ${
          isFormValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        가입하기
      </button>
    </form>
  );
}
