import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioSelector from 'components/edit/PortfolioSelector';
import Button from 'components/common/Button';
import { useUser } from 'context/UserContext';
import { useMentoring } from 'context/MentoringContext'; 
import { PortfolioStatus } from 'types/portfolio';


interface Portfolio {
  id: number;
  title: string;
  uploadDate: string;
}

const Request = () => {
  const { addRequest } = useMentoring();
  const navigate = useNavigate();
  const {user,setUser} = useUser();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'MENTEE') {
      alert('멘티만 접근 가능한 페이지입니다.');
      navigate('/');
      return;
    }
    const available = (user.portfolios ?? []).filter(p => p.status === 'REGISTERED');

    if (available.length === 0) {
      navigate('/mypage/portfolio');
    } else {
      setPortfolios(available);
    }
  }, [navigate,user]); // ✅ 여기에 navigate 추가
  

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (selectedId !== null && user) {
      const selectedPortfolio = (user.portfolios ?? []).find(p => p.id === selectedId);
      if (!selectedPortfolio) return;
  
      addRequest({
        id: Date.now(), // 임시 ID
        menteeId: user.user_id,
        menteeNickname: user.nickname,
        position: user.position,
        role: user.role,
        profileUrl: '/profile.png',
        title: selectedPortfolio.title,
        requestDate: new Date().toISOString().slice(0, 10),
        portfolioId: selectedPortfolio.id, // ✅ 나중에 필터링용
      });
  const updatedPortfolios = (user.portfolios ?? []).map((p) =>
      p.id === selectedId ? { ...p, status: 'REQUESTED' as PortfolioStatus } : p
    );
      setUser({ ...user, portfolios: updatedPortfolios });

      alert('첨삭 요청이 등록되었습니다!');
      navigate('/edit/Request');
    }
  };
  return (
    <div className="px-6 py-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">첨삭받을 포트폴리오 선택</h1>
      <div className="space-y-3">
        {portfolios.map((item) => (
          <PortfolioSelector
            key={item.id}
            id={item.id}
            title={item.title}
            uploadDate={item.uploadDate}
            selected={item.id === selectedId}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant='primary' label="첨삭" onClick={handleSubmit}/>
      </div>
    </div>
  );
};

export default Request;
