import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from 'context/UserContext';
import PortfolioForm from 'components/mypage/myPortfolio/PortfolioForm';
import type { Portfolio } from 'types/portfolio';

const MyPortfolioUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id || !user) return;

    axios.get(`http://localhost:8080/portfolios/${id}`)
      .then((res) => {
        const data = res.data.data;
        setPortfolio(data);
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => {
        console.error('포트폴리오 불러오기 실패:', err);
        alert('포트폴리오 정보를 불러오지 못했습니다.');
        navigate('/mypage/portfolio');
      });
  }, [id, user, navigate]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (file) formData.append('file', file);

      await axios.put(`http://localhost:8080/portfolios/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('포트폴리오가 수정되었습니다.');
      navigate('/mypage/portfolio/detail/${newId}');
    } catch (err) {
      console.error('수정 실패:', err);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  if (!portfolio) return <div className="text-center py-10">로딩 중...</div>;

  return (
    <PortfolioForm
      title={title}
      content={content}
      fileName={file?.name}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onFileChange={setFile}
      onSubmit={handleUpdate}
      submitLabel="수정"
    />
  );
};

export default MyPortfolioUpdate;