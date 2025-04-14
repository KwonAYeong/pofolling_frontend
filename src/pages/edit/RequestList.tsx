// /pages/edit/RequestList.tsx
import { useEffect, useState } from 'react';
import RequestCard from 'components/edit/RequestCard';
import Pagination from 'components/common/Pagination';
import { useUser,UserRole } from 'context/UserContext';
import { useNavigate } from 'react-router-dom';

interface RequestItem {
  id: number;
  nickname: string;
  position: string;
  role: UserRole;
  profileUrl?: string;
  title: string;
  requestDate: string;
}

const dummyData: RequestItem[] = [
  {
    id: 1,
    nickname: 'kay',
    position: '디자이너',
    role: 'MENTEE',
    profileUrl: '',
    title: '디자이너 포트폴리오',
    requestDate: '2025-04-13',
  },
  {
    id: 2,
    nickname: 'khj',
    position: 'IT',
    role: 'MENTEE',
    profileUrl: '',
    title: '백엔드 포폴',
    requestDate: '2025-04-12',
  },
  // ...더미 추가 가능, 후에 수정
];

const RequestList = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('전체');
  const [requestList, setRequestList] = useState<RequestItem[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const pageSize = 5;
  const filtered = filter === '전체'
    ? requestList
    : requestList.filter((r) => r.position === filter);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  useEffect(() => {
     if (!user || user.role !== 'MENTOR') {
      alert('멘토만 접근 가능한 페이지입니다.');
      navigate('/');
      return;
    }
    setRequestList(dummyData);
  },[user, navigate]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">첨삭 요청 리스트</h1>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1); // 필터 바뀌면 1페이지로
          }}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="전체">전체</option>
          <option value="IT">IT</option>
          <option value="건축">건축</option>
          <option value="디자이너">디자이너</option>
        </select>
      </div>

      <div className="space-y-4">
        {paginated.map((item) => (
          <RequestCard key={item.id} {...item} />
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

export default RequestList;
