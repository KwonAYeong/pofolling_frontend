import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'context/UserContext';

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const goToReview = () => {
    if (!user) return;

    if (user.role === 'MENTOR') {
      navigate('/edit-response'); // 멘토 → 첨삭 요청 리스트
    } else if (user.role === 'MENTEE') {
      navigate('/edit-requests'); // 멘티 → 포트폴리오 리스트
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">MAIN</h1>
        <button
          onClick={goToReview}
          className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          첨삭 받으러 가기
        </button>
      </main>
    </div>
  );
};

export default MainPage;
