import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Portfolio } from 'types/portfolio';
import PortfolioDetailCard from 'components/portfolio/PortfolioDetailCard';
import Button from 'components/common/Button';
import axios from 'axios';

const MyPofolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    // 임시 더미 데이터 (실제로는 API 요청으로 대체)
    const dummy: Portfolio[] = [
      {
        portfolioId: 1,
        title: 'UX 포트폴리오 정리본',
        content: '내용 생략',
        createdAt: '2025-03-20T10:00:00Z',
        updatedAt: '2025-04-01T12:00:00Z',
        fileUrl: '',
        status: 'REGISTERED',
        userId: 1,
      },
    ];

    const selected = dummy.find((p) => p.portfolioId === Number(id));
    setPortfolio(selected || null);
  }, [id]);

  const handleEdit = () => {
    navigate(`/mypage/portfolio/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/portfolios/${portfolio}`);
      alert('삭제되었습니다.');
      navigate('/mypage/portfolio'); // 리스트로 이동
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };


  if (!portfolio) {
    return <div className="text-center text-sm mt-10">포트폴리오를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <PortfolioDetailCard portfolio={portfolio}>
        <div className="flex gap-2">
          <Button label="수정" variant="primary" onClick={handleEdit} />
          <Button label="삭제" variant="danger" onClick={handleDelete} />
        </div>
      </PortfolioDetailCard>
    </div>
  );
};

export default MyPofolDetail;
