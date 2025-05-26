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

  const dto = {
    title,
    content,
  };

  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
  formData.append('file', file);

  await axios.post('/mypage/portfolio', formData, {
    params: { userId: user?.user_id }, 
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  alert('포트폴리오가 등록되었습니다.');
  navigate(`/mypage/portfolio`);
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
