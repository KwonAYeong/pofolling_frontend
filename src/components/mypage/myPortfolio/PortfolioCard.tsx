import { Portfolio } from 'types/portfolio';
import StatusBadge from './StatusBadge';
import { useNavigate } from 'react-router-dom';

const PortfolioCard = ({ portfolio }: { portfolio: Portfolio }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mypage/portfolio/detail/${portfolio.portfolioId}`);
  };

  return (
    <div
      className="grid grid-cols-[1fr_220px] items-center px-4 py-3 text-sm h-14 cursor-pointer hover:bg-gray-50 transition"
      onClick={handleClick}
    >
      {/* 제목 */}
      <span className="truncate font-medium text-gray-800">
        {portfolio.title}
      </span>

      {/* 날짜 + 상태 */}
      <div className="flex items-center gap-4 justify-end">
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {portfolio.updatedAt.split('T')[0]}
        </span>
        <StatusBadge status={portfolio.status} />
      </div>
    </div>
  );
};

export default PortfolioCard;
