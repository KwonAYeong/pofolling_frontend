import { useEffect, useRef, useState } from 'react';
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
  const calledOnce = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRegistered, setShowRegistered] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    if (user.role !== 'MENTEE') {
      alert('멘티만 접근 가능한 페이지입니다.');
      navigate('/');
      return;
    }

    if (calledOnce.current) return;
    calledOnce.current = true;

    axios
      .get(`http://localhost:8080/edit-request/${user.user_id}`)
      .then((res) => {
        const data: Portfolio[] = res.data.data ?? [];
        if (data.length === 0) {
          alert('요청 가능한 포트폴리오가 없습니다.');
          navigate('/mypage/portfolio');
        } else {
          setPortfolios(data);
        }
      })
      .catch((err) => {
        console.error('포트폴리오 불러오기 실패:', err);
      })
      .finally(() => {
      setIsLoading(false);
    });
  }, [user, navigate]);

  useEffect(() => {
    setIsSubmitting(false);
  }, [selectedId]);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleSubmit = async () => {
    if (selectedId === null || !user || isSubmitting) return;

    setIsSubmitting(true);

    const selectedPortfolio = portfolios.find(
      (p) => p.portfolioId === selectedId
    );

    if (!selectedPortfolio) {
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('http://localhost:8080/edit-request', {
        menteeId: user.user_id,
        portfolioId: selectedPortfolio.portfolioId,
      });

      setPortfolios((prev) =>
        prev.filter((p) => p.portfolioId !== selectedId)
      );

      const updatedPortfolios = (user.portfolios ?? []).map((p) =>
        p.portfolioId === selectedId
          ? { ...p, status: 'REQUESTED' as Portfolio['status'] }
          : p
      );
      setUser({ ...user, portfolios: updatedPortfolios });

      alert('첨삭 요청이 전송되었습니다!');
      navigate('/edit-request');
    } catch (err) {
      console.error('요청 실패:', err);
      alert('요청 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const registered = portfolios.filter((p) => p.status === 'REGISTERED');
  const completed = portfolios.filter((p) => p.status === 'COMPLETED');

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      {/* 상단 제목 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">첨삭 요청</h1>

      {/* 등록된 포트폴리오 */}
      <section className="mb-10">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowRegistered(!showRegistered)}
        >
          <h2 className="text-base font-bold text-gray-700">등록된 포트폴리오</h2>
          <span className="text-sm text-gray-500">
            {showRegistered ? '▲' : '▼'}
          </span>
        </div>
        <div className="w-full border-b-2 border-gray-400 mt-2 mb-4" />
          {showRegistered && (
          <div className="space-y-3">
            {isLoading ? null : registered.length === 0 ? (
              <p className="text-gray-400 text-sm">요청 가능한 포트폴리오가 없습니다.</p>
            ) : (
              registered.map((item) => (
                <PortfolioSelector
                  key={item.portfolioId}
                  id={item.portfolioId}
                  title={item.title}
                  selected={item.portfolioId === selectedId}
                  status={item.status}
                  requestCount={item.requestCount}
                  onSelect={handleSelect}
                />
              ))
            )}
          </div>
        )}
      </section>

      {/* 첨삭 완료 포트폴리오 */}
      <section className="mb-10">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <h2 className="text-base font-bold text-green-700">
            첨삭했던 포트폴리오
          </h2>
          <span className="text-sm text-gray-500">
            {showCompleted ? '▲' : '▼'}
          </span>
        </div>
        <div className="w-full border-b-2 border-green-400 mt-2 mb-4" />
        {showCompleted && (
          <div className="space-y-3">
            {isLoading ? null : completed.length === 0 ? (
              <p className="text-gray-400 text-sm">완료된 포트폴리오가 없습니다.</p>
            ) : (
              completed.map((item) => (
                <PortfolioSelector
                  key={item.portfolioId}
                  id={item.portfolioId}
                  title={item.title}
                  selected={item.portfolioId === selectedId}
                  status={item.status}
                  requestCount={item.requestCount}
                  onSelect={handleSelect}
                />
              ))
            )}
          </div>
        )}
      </section>

      {/* 첨삭 요청 버튼 */}
      {registered.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Button
            variant="primary"
            label="첨삭 요청"
            onClick={handleSubmit}
            disabled={selectedId === null}
          />
        </div>
      )}
    </div>
  );
};

export default Request;
