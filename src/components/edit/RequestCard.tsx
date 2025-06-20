
import { useNavigate } from 'react-router-dom';
import UserBadge from 'components/common/UserBadge';
import { formatDateTime } from 'utils/format';

interface RequestCardProps {
  id: number;
  nickname: string;
  jobType: string;
  profileUrl?: string;
  title: string;
  requestedAt: string;
}

const RequestCard = ({
  id,
  nickname,
  jobType,
  profileUrl,
  title,
  requestedAt,
}: RequestCardProps) => {
  const navigate = useNavigate();

  return (
    <div
  className="grid grid-cols-[240px_1fr_120px] items-center px-6 py-4 border rounded-2xl shadow-sm hover:bg-gray-50 cursor-pointer"
  onClick={() => navigate(`/edit-response/${id}`)}
>
  {/* 왼쪽: 유저 정보 */}
  <div className="flex items-center gap-4">
    <UserBadge role="MENTEE" profileUrl={profileUrl} className="w-10 h-10" />
    <div className="flex flex-col text-sm">
      <span className="font-semibold">{nickname}</span>
      <span className="text-gray-500">{jobType}</span>
    </div>
  </div>

  {/* 중앙: 제목 */}
  <div className="text-lg font-medium truncate">{title}</div>

  {/* 오른쪽: 날짜 */}
  <div className="text-sm text-gray-500 whitespace-nowrap text-right"><span>{formatDateTime(requestedAt)}</span></div>
</div>
  );
};

export default RequestCard;
