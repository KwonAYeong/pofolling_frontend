import StatusBadge from "components/mypage/myPortfolio/StatusBadge";

interface Props {
  id: number;
  title: string;
  selected: boolean;
  status: 'REGISTERED' | 'REQUESTED' | 'IN_PROGRESS' | 'COMPLETED';
  requestCount?: number;
  onSelect: (id: number) => void;
}

const PortfolioSelector = ({
  id,
  title,
  selected,
  status,
  requestCount,
  onSelect,
}: Props) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`cursor-pointer border px-6 py-4 rounded-lg transition-colors w-full h-[80px] ${
        selected ? 'bg-blue-100 border-blue-400' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-center h-full">
        {/* 제목 (왼쪽) */}
        <h2 className="text-xl font-semibold truncate">{title}</h2>

        {/* 오른쪽: 첨삭횟수 + 상태뱃지 */}
        <div className="flex items-center gap-10 min-w-[150px] justify-end">
          {status === 'COMPLETED' && (
            <div className="text-sm text-gray-600 whitespace-nowrap">
              첨삭 {requestCount}회
            </div>
          )}
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioSelector;
