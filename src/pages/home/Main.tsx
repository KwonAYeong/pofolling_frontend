import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';

const MainPage = () => {
  const navigate = useNavigate();

  const goToReview = () => {
    navigate('/review'); // 첨삭 페이지 경로
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 메인 콘텐츠 */}
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