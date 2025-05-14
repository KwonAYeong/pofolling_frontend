import UserBadge from '../common/UserBadge';
import Button from '../common/Button';
import { UserRole } from 'context/UserContext';
import type { Portfolio } from 'types/portfolio';
import StatusBadge from 'components/mypage/myPortfolio/StatusBadge';

interface Props {
  portfolio: Portfolio;
  userRole?: UserRole;
  profileUrl?: string;
  nickname?: string; 
  showUserBadge?: boolean;
  showDownload?: boolean;
  downloadId?: number;
  requestDate?: string;
  updatedDate?: string;
  children?: React.ReactNode;
}

const PortfolioDetailCard = ({
  portfolio,
  userRole,
  profileUrl,
  nickname,
  showUserBadge = true,
  showDownload = true,
  downloadId,
  requestDate,
  updatedDate,
  children,
}: Props) => {
  if (!portfolio) return <div>포트폴리오 정보가 없습니다.</div>;

  return (
    <div className="p-6 max-w-[600px] mx-auto border rounded-xl shadow-sm bg-white space-y-6">
      {/* 상단 정보: 프로필 or 수정일 + 상태 */}
      <div className="flex justify-between items-start">
        {/* 왼쪽: 멘토 → 프로필 + 등록일 / 멘티 → 수정일만 */}
        <div className="flex flex-col gap-1">
          {userRole === 'MENTOR' && (
            <>
              <div className="flex items-center gap-3">
                <UserBadge role="MENTEE" profileUrl={profileUrl} className="w-12 h-12" />
                <span className="text-sm font-medium">{nickname}</span>
              </div>
              <div className="text-xs text-gray-500 ml-14">
                등록일: {requestDate?.slice(0, 10)}
              </div>
            </>
          )}

          {userRole === 'MENTEE' && (
            <div className="text-xs text-gray-500">
              최종 수정일: {updatedDate?.slice(0, 10)}
            </div>
          )}
        </div>

        {/* 오른쪽: 상태 뱃지 (모두 공통) */}
        <StatusBadge status={portfolio.status} />
      </div>

      {/* 제목 */}
      <div className="flex items-start gap-4">
        <label className="w-16 text-sm font-medium">제목</label>
        <div className="flex-1 px-4 py-2 rounded-full border text-sm bg-gray-50">
          {portfolio.title}
        </div>
      </div>

      {/* 내용 */}
      <div className="flex items-start gap-4">
        <label className="w-16 text-sm font-medium mt-1">내용</label>
        <div className="flex-1 px-4 py-3 rounded-xl border text-sm bg-gray-50 min-h-[120px] whitespace-pre-wrap">
          {portfolio.content ?? '내용 없음'}
        </div>
      </div>

      {/* 파일 다운로드 */}
      {showDownload && downloadId && (
        <div className="flex items-center gap-4">
          <label className="w-16 text-sm font-medium">파일다운</label>
          <Button
            label="다운로드"
            onClick={() => window.open(`/portfolio/file/${downloadId}`, '_blank')}
            variant="secondary"
          />
        </div>
      )}

      {/* 하단 버튼 */}
      <div className="flex justify-end pt-2">
        {children}
      </div>
    </div>
  );
};

export default PortfolioDetailCard;
