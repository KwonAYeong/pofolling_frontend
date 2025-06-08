import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'context/UserContext';

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const goToReview = () => {
    if (!user) return;

    if (user.role === 'MENTOR') {
      navigate('/edit-response');
    } else if (user.role === 'MENTEE') {
      navigate('/edit-request');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 text-center pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
          나의 성장과 커리어를 위한 첫 걸음
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          현직 멘토와 실시간 채팅으로<br />
          포트폴리오 첨삭을 경험하세요.
        </p>
        <button
          onClick={goToReview}
          className="px-10 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition shadow-md"
        >
          첨삭 시작하기
        </button>
      </main>

      {/* 대표 이미지 (채팅 화면 스크린샷) */}
      <section className="w-full flex justify-center py-8">
        <img
          src="/chat_test.png"
          alt="채팅 화면 예시"
          className="max-w-4xl w-full object-contain max-h-[720px] border border-gray-300 rounded-lg shadow"
        />
      </section>


      {/* 멘티 기능 설명 */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">멘티를 위한 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            image="/mentee/request.png"
            title="포트폴리오 첨삭 요청"
            description={`내 포트폴리오에 대한 현직 멘토의
               피드백을 받을 수 있습니다.`}
          />
          <FeatureCard
            image="/mentee/chatting.png"
            title="실시간으로 피드백 받기"
            description={`멘토와 채팅으로 자유롭게
               피드백을 주고받으며 
              포트폴리오를 개선하세요.`}
          />
          <FeatureCard
            image="/mentee/portfolio.png"
            title="포트폴리오 관리"
            description={`나의 포트폴리오를  손쉽게
             등록, 수정, 관리할 수 있습니다.`}
          />
        </div>
      </section>

      {/* 멘토 기능 설명 */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">멘토를 위한 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            image="/mentor/response.png"
            title="첨삭 요청 리스트 확인"
            description={`멘티들이 요청한 첨삭 목록을 
              한눈에 확인하고 수락할 수 있습니다`}
          />
          <FeatureCard
            image="/mentor/response_detail.png"
            title="첨삭 진행하기"
            description={`선택한 첨삭 요청에서 포트폴리오를
               확인하고 첨삭을 진행할 수 있습니다`}
          />

          <FeatureCard
            image="/mentor/community.png"
            title="커뮤니티 참여하기"
            description={`자유게시판에서 다양한 정보와 경험을
               공유하고 다른 멘토, 멘티들과
               소통할 수 있습니다.`}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">지금 시작해보세요!</h2>
        <button
          onClick={goToReview}
          className="px-10 py-4 bg-white text-gray-600 font-semibold text-lg rounded-lg hover:bg-gray-100 transition shadow-md"
        >
          첨삭 시작하기
        </button>
      </section>
    </div>
  );
};

// FeatureCard 컴포넌트
const FeatureCard = ({ image, title, description }: { image: string; title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <img src={image} alt={title} className="w-90 h-90 mb-6 object-contain" />
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">{description}</p>
    </div>
  );
};

export default MainPage;
