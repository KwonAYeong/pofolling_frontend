import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'api/axios';
import { useUser } from 'context/UserContext';
import PortfolioForm from 'components/mypage/myPortfolio/PortfolioForm';

const MyPortfolioCreate = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !file) {
      alert('제목, 내용, 파일을 모두 입력해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userId', String(user?.user_id));
      formData.append('title', title);
      formData.append('content', content);
      formData.append('file', file);

      await axios.post('/mypage/portfolio', {
        title,
        content,
        fileUrl: 'https://cdn.myproject.com/uploads/yourfile.pdf', // 또는 임시 경로
      }, {
        params: { userId: user?.user_id }
      });

      alert('포트폴리오가 등록되었습니다.');
      navigate(`/mypage/portfolio`);
    } catch (err) {
      console.error('등록 실패:', err);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <PortfolioForm
      title={title}
      content={content}
      fileName={file?.name}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onFileChange={setFile}
      onSubmit={handleSubmit}
      submitLabel="등록"
    />
  );
};

export default MyPortfolioCreate;
