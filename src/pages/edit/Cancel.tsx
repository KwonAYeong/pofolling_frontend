import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from 'context/UserContext';
import type { Portfolio } from 'types/portfolio';

const Cancel = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    if (user.role !== 'MENTEE') {
      alert('멘티만 접근 가능한 페이지입니다.');
      navigate('/');
      return;
    }

    axios
      .get(`http://localhost:8080/edit-request/${user.user_id}`)
      .then((res) => {
        const data: Portfolio[] = res.data?.data ?? [];
        setPortfolios(data);
      })
      .catch((err) => {
        console.error('요청 목록 불러오기 실패:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, navigate]);

  const handleCancel = async (portfolioId: number) => {
    const confirm = window.confirm('정말로 이 첨삭 요청을 취소하시겠습니까?');
    if (!confirm) return;

    try {
      await axios.patch(`http://localhost:8080/edit-request/${portfolioId}/cancel`);
      setPortfolios((prev) =>
        prev.filter((p) => p.portfolioId !== portfolioId)
      );
      alert('첨삭 요청이 취소되었습니다.');
    } catch (err) {
      console.error('요청 취소 실패:', err);
      alert('요청 취소에 실패했습니다.');
    }
  };


  const requestedOnly = portfolios.filter((p) => p.status === 'REQUESTED');

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">첨삭 요청 취소</h1>

      <section className="mb-10">
        <h2 className="text-base font-bold text-red-600 mt-4">요청 중인 포트폴리오</h2>
        <div className="w-full border-b-2 border-red-300 mt-2 mb-4" />

        <div className="space-y-3">
          {isLoading ? null : requestedOnly.length === 0 ? (
            <p className="text-gray-400 text-sm">
              요청 중인 포트폴리오가 없습니다.
            </p>
          ) : (
            requestedOnly.map((item) => (
            <div
              key={item.portfolioId}
              className="h-[80px] flex items-center justify-between border px-6 rounded-lg"
            >
              {/* 카드 왼쪽 영역 */}
              <div className="flex-1">
                <div className="text-base font-semibold truncate">{item.title}</div>
              </div>

              {/* 버튼 오른쪽 영역 */}
              <button
                className="ml-4 text-sm text-red-400 border border-red-400 px-3 py-1 rounded hover:bg-red-100"
                onClick={() => handleCancel(item.portfolioId)}
              >
                요청 취소
              </button>
            </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Cancel;
