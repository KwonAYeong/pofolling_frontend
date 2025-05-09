import { useEffect, useState } from 'react';
import { useUser } from 'context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Portfolio } from 'types/portfolio';
import PortfolioCard from '../../../components/mypage/myPortfolio/PortfolioCard';
import Button from 'components/common/Button';

const MyPortfolioList = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(false);

  useEffect(() => {
    if (user?.role !== 'MENTEE') {
      alert('멘티만 접근 가능한 페이지입니다.');
      navigate('/');
      return;
    }

    const dummy: Portfolio[] = [
      {
        portfolioId: 1,
        title: 'UX 포트폴리오 정리본',
        content: '내용 생략',
        createdAt: '2025-03-20T10:00:00Z',
        updatedAt: '2025-04-01T12:00:00Z',
        fileUrl: '',
        status: 'REGISTERED',
        userId: user.user_id,
      },
      {
        portfolioId: 2,
        title: '기획 초안',
        content: '내용 생략',
        createdAt: '2025-03-28T09:20:00Z',
        updatedAt: '2025-04-03T17:15:00Z',
        fileUrl: '',
        status: 'REQUESTED',
        userId: user.user_id,
      },
      {
        portfolioId: 3,
        title: '디자인 피드백 중',
        content: '내용 생략',
        createdAt: '2025-04-01T11:00:00Z',
        updatedAt: '2025-04-05T14:45:00Z',
        fileUrl: '',
        status: 'IN_PROGRESS',
        userId: user.user_id,
      },
      {
        portfolioId: 4,
        title: '최종 발표 자료',
        content: '내용 생략',
        createdAt: '2025-04-02T08:30:00Z',
        updatedAt: '2025-04-07T09:00:00Z',
        fileUrl: '',
        status: 'COMPLETED',
        userId: user.user_id,
      },
    ];
    
    setPortfolios(dummy);
    setLoading(false);
  }, [user, navigate]);

  return (
    <div className="w-full max-w-[600px] mx-auto px-4">
      {/* 제목 */}
      <h1 className="text-xl font-bold mb-4">나의 포트폴리오 관리</h1>

      {/* 상태별 처리 */}
      {loading && <p className="text-center text-sm text-gray-500">불러오는 중...</p>}
      {error && <p className="text-center text-sm text-red-500">데이터를 불러오지 못했습니다.</p>}
      {!loading && !error && portfolios.length === 0 && (
        <p className="text-center text-sm text-gray-500">포트폴리오가 없습니다.</p>
      )}

    {/* 리스트 컨테이너 */}
    <div className="rounded-md overflow-hidden bg-white border">
      {portfolios.map((portfolio, idx) => (
        <div
          key={portfolio.portfolioId}
          className={`px-1 py-1 ${idx !== 0 ? 'border-t border-gray-200' : ''}`}
        >
          <PortfolioCard portfolio={portfolio} />
        </div>
      ))}
    </div>


      {/* 등록 버튼 - 오른쪽 아래 정렬 */}
      <div className="mt-4 flex justify-end">
        <Button
          label="포트폴리오 등록"
          variant="primary"
          onClick={() => navigate('/mypage/portfolio/create')}
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default MyPortfolioList;
