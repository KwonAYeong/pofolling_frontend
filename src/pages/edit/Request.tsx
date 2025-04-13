import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioSelector from 'components/edit/PortfolioSelector';
import Button from 'components/common/Button';
import { useUser } from 'context/UserContext';

interface Portfolio {
  id: number;
  title: string;
  uploadDate: string;
}

const Request = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'MENTEE') {
      alert('멘티만 접근 가능한 페이지입니다.');
      navigate('/');
      return;
    }
  
    const myPortfolios = user.portfolios || [];
    if (myPortfolios.length === 0) {
      navigate('/mypage/portfolio');
    } else {
      setPortfolios(myPortfolios);
    }
  }, [navigate,user]); // ✅ 여기에 navigate 추가
  

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (selectedId !== null) {
      console.log('선택된 포트폴리오 ID:', selectedId);
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
