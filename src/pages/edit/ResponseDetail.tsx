import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import PortfolioDetailCard from '../../components/portfolio/PortfolioDetailCard';
import Button from '../../components/common/Button';

interface EditRequestDetail {
  menteeId: number;
  nickname: string;
  profileImage?: string;
  requestedAt: string;
  portfolioId: number;
  title: string;
  content: string;
  updatedAt: string;
  fileUrl?: string;
}

const RequestDetail = () => {
  const { id: editRequestIdFromUrl } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [request, setRequest] = useState<EditRequestDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/edit-response/${editRequestIdFromUrl}`);
        setRequest(res.data?.data);
      } catch (err) {
        console.error('요청 상세 조회 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequest();
  }, [editRequestIdFromUrl]);

  const handleAccept = async () => {
    if (!editRequestIdFromUrl || !user?.user_id) {
      alert("필요한 정보가 없습니다.");
      return;
    }

    try {
      await axios.patch(`http://localhost:8080/edit-response/${editRequestIdFromUrl}/${user.user_id}`);
      alert('첨삭을 수락했습니다!');
      navigate('/edit-response');
    } catch (err) {
      console.error('첨삭 수락 실패:', err);
      alert('서버 오류가 발생했습니다.');
    }
  };

  if (isLoading) return <div></div>;

  if (!request || !request.portfolioId) {
    return <div className="p-6 text-red-500">요청을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-6 max-w-[600px] mx-auto space-y-6">
      <PortfolioDetailCard
        portfolio={{
          nickname: request.nickname,
          portfolioId: request.portfolioId,
          title: request.title,
          content: request.content,
          requestedAt: request.requestedAt,
          updatedAt: request.updatedAt,
          fileUrl: request.fileUrl ?? '',
          userId: request.menteeId,
          status: 'REQUESTED',
        }}
        userRole={user?.role}
        profileUrl={request.profileImage}
        downloadId={request.portfolioId}
        nickname={request.nickname}
      />
      <div className="flex justify-end">
        <Button label="첨삭 수락" variant="primary" onClick={handleAccept} />
      </div>
    </div>
  );
};

export default RequestDetail;
