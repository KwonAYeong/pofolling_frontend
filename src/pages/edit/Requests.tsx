import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PortfolioSelector from 'components/edit/PortfolioSelector';
import Button from 'components/common/Button';
import { useUser } from 'context/UserContext';
import type { Portfolio } from 'types/portfolio';


const Request = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    if (!user) return;
  //   if (!user || user.role !== 'MENTEE') {
  //     alert('멘티만 접근 가능한 페이지입니다.');
  //     navigate('/');
  //     return;
  //   }


    axios.get(`http://localhost:8080/edit-requests/${user?.user_id}`)

    .then((res) => {
      const data: Portfolio[] = res.data.data ?? [];
      const available = data;

      if (available.length === 0) {
        alert('요청 가능한 포트폴리오가 없습니다.');
        navigate('/mypage/portfolio');
      } else {
        setPortfolios(available);
      }
    })
    .catch((err) => {
      console.error('포트폴리오 불러오기 실패:', err);
    });
}, [user, navigate]);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleSubmit = async () => {
    if (selectedId === null || !user) return;

    const selectedPortfolio = portfolios.find(
      (p) => p.portfolioId === selectedId
    );
    
    if (!selectedPortfolio) return;

    try {
      await axios.post('http://localhost:8080/edit-requests', {
        menteeId: user.user_id,
        portfolioId: selectedPortfolio.portfolioId,
       // requestedAt: new Date().toISOString(),
      });

      // 로컬 상태도 REQUESTED로 업데이트
      const updatedPortfolios = (user.portfolios ?? []).map((p) =>
        p.portfolioId === selectedId
          ? {
              ...p,
              status: 'REQUESTED' as Portfolio['status'] 
            }
          : p
      );
      setUser({ ...user, portfolios: updatedPortfolios });
      alert('첨삭 요청이 전송되었습니다!');
      navigate('/edit-requests');
    } catch (err) {
      console.error('요청 실패:', err);
      alert('요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="px-6 py-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">첨삭받을 포트폴리오 선택</h1>
      <div className="space-y-3">
        {portfolios.map((item) => (
          <PortfolioSelector
            key={item.portfolioId}
            id={item.portfolioId}
            title={item.title}
            uploadDate={item.updatedAt.slice(0, 10)} // YYYY-MM-DD 형식
            selected={item.portfolioId === selectedId}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="primary" label="첨삭 요청" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Request;
