import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from 'context/UserContext';
import { Portfolio } from 'types/portfolio';
import PortfolioDetailCard from 'components/portfolio/PortfolioDetailCard';
import Button from 'components/common/Button';
import axios from 'axios';

const MyPofolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    if (user?.role === 'MENTOR') {
      alert('멘토는 포트폴리오 상세 페이지에 접근할 수 없습니다.');
      navigate('/');
      return;
    }
   
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get<Portfolio>(`http://localhost:8080/mypage/portfolio/${id}`);
        setPortfolio(res.data);
      } catch (err) {
        console.error('포트폴리오 불러오기 실패:', err);
        setPortfolio(null);
      }
    };

    fetchPortfolio();
  }, [id, navigate, user]);

  const handleEdit = () => {
    navigate(`/mypage/portfolio/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/mypage/portfolio/${portfolio?.portfolioId}`);
      alert('삭제되었습니다.');
      navigate('/mypage/portfolio');
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleCancelRequest = async () => {
    const confirmCancel = window.confirm('첨삭 요청을 취소하시겠습니까?');
    if (!confirmCancel) return;

    try {
      await axios.patch(`http://localhost:8080/edit-request/${portfolio?.portfolioId}/cancel`);
      alert('첨삭 요청이 취소되었습니다.');
      navigate('/mypage/portfolio');
    } catch (error) {
      console.error('요청 취소 오류:', error);
      alert('요청 취소 중 오류가 발생했습니다.');
    }
  };

  if (!portfolio) {
    return <div></div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* 페이지 제목 */}
      <h1 className="text-lg font-semibold text-gray-800 mb-6 ml-[80px]">포트폴리오 상세보기</h1>

      {/* 상세 카드 */}
      <PortfolioDetailCard
        portfolio={portfolio}
        userRole={user?.role}
        showUserBadge={false}
        nickname={portfolio.nickname}
        requestedAt={portfolio.requestedAt}
        updatedAt={portfolio.updatedAt}
        downloadId={portfolio.portfolioId}
      >
      <div className="flex gap-2">
        {(portfolio.status === 'REGISTERED' || portfolio.status === 'COMPLETED') && (
          <Button label="수정" variant="primary" onClick={handleEdit} />
        )}
        {portfolio.status === 'REGISTERED' && (
          <Button label="삭제" variant="danger" onClick={handleDelete} />
        )}
      </div>

      {portfolio.status === 'REQUESTED' && (
      <div className="mt-4">
        <Button label="첨삭 요청 취소" variant="danger" onClick={handleCancelRequest} />
      </div>
      )}
          </PortfolioDetailCard>
    </div>
    
  );
};

export default MyPofolDetail;
