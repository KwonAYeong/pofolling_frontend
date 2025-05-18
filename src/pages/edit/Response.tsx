import { useEffect, useState } from 'react';
import axios from 'axios';
import RequestCard from 'components/edit/RequestCard';
import Pagination from 'components/common/Pagination';
import { formatDateTime } from 'utils/format';

interface RequestItem {
  editRequestId: number;
  title: string;
  nickname: string;
  profileImage: string;
  requestedAt: string;
  jobType:string;
}

const Response = () => {
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState<RequestItem[]>([]);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/edit-response?page=0');
        const content = res.data?.data?.content;

        if (Array.isArray(content)) {
          setResponse(content);
        } else {
          console.error('❌ content가 배열이 아님:', content);
          setResponse([]);
        }
      } catch (error) {
        console.error('요청 실패:', error);
      }
    };

    fetchData();
  }, []);

  const paginated = response.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(response.length / pageSize);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">첨삭 요청 리스트</h1>

      <div className="space-y-4">
        {paginated.map((item) => (
          <RequestCard
            key={item.editRequestId}
            id={item.editRequestId}
            title={item.title}
            nickname={item.nickname}
            profileUrl={item.profileImage}
            requestedAt={formatDateTime(item.requestedAt)}
            jobType={item.jobType}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Response;
