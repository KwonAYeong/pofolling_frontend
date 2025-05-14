import { useEffect, useState, useMemo } from 'react';
import { useUser } from 'context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Portfolio } from 'types/portfolio';
import PortfolioCard from '../../../components/mypage/myPortfolio/PortfolioCard';
import Button from 'components/common/Button';
import axios from 'axios';

const FILTER_OPTIONS = [
  { label: '전체', value: 'ALL' },
  { label: '등록됨', value: 'REGISTERED' },
  { label: '요청중', value: 'REQUESTED' },
  { label: '첨삭중', value: 'IN_PROGRESS' },
  { label: '첨삭완료', value: 'COMPLETED' },
];

const MyPortfolioList = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'REGISTERED' | 'REQUESTED' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');

  useEffect(() => {
    if (user?.role !== 'MENTEE') {
      alert('멘티만 접근 가능한 페이지입니다.');
      navigate('/');
      return;
    }

    const fetchPortfolios = async () => {
      try {
        const res = await axios.get<Portfolio[]>(`http://localhost:8080/mypage/portfolio/list`, {
          params: { userId: user.user_id }
        });
        setPortfolios(res.data);
      } catch (err) {
        console.error('포트폴리오 목록 불러오기 실패:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [user, navigate]);

  const filteredList = useMemo(() => {
    const sorted = [...portfolios].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    if (filter === 'ALL') return sorted;
    return sorted.filter(p => p.status === filter);
  }, [portfolios, filter]);

  return (
    <div className="w-full max-w-[600px] mx-auto px-4">
      {/* 제목 */}
      <h1 className="text-xl font-bold mb-4">나의 포트폴리오 관리</h1>

      {/* 필터 버튼 */}
      <div className="flex gap-2 mb-4">
        {FILTER_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value as any)}
            className={`px-4 py-2 rounded text-sm border ${filter === value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 상태별 처리 */}
      {loading && <p className="text-center text-sm text-gray-500">불러오는 중...</p>}
      {error && <p className="text-center text-sm text-red-500">데이터를 불러오지 못했습니다.</p>}
      {!loading && !error && filteredList.length === 0 && (
        <p className="text-center text-sm text-gray-500">포트폴리오가 없습니다.</p>
      )}

      {/* 리스트 컨테이너 */}
      <div className="rounded-md overflow-hidden bg-white border">
        {filteredList.map((portfolio, idx) => (
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
