import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const CommunityWrite = () => {
  const [searchParams] = useSearchParams();
  const editMode = searchParams.get('edit') === 'true';
  const postId = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileInputs, setFileInputs] = useState<(File | null)[]>([null, null, null]);
  const [existingFiles, setExistingFiles] = useState<(string | null)[]>([null, null, null]);
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);

  const { user } = useUser();
  const userId = user?.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (editMode && postId && userId) {
        try {
          const res = await axios.get(`http://localhost:8080/community/post/${postId}/${userId}`);
          const post = res.data.data;
          setTitle(post.title);
          setContent(post.content);

          const fileUrls: string[] = post.fileUrls || [];
          const padded = [...fileUrls.slice(0, 3), null, null, null].slice(0, 3);
          setExistingFiles(padded);
        } catch (err) {
          console.error('수정할 게시글 불러오기 실패', err);
          alert('게시글을 불러올 수 없습니다.');
        }
      }
    };

    fetchPost();
  }, [editMode, postId, userId]);

  const handleSingleFileChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    const newFiles = [...fileInputs];
    newFiles[index] = selectedFile;
    setFileInputs(newFiles);

    const existing = existingFiles[index];
    if (existing) {
      setDeletedFiles((prev) => [...prev, existing]);
      const updatedExisting = [...existingFiles];
      updatedExisting[index] = null;
      setExistingFiles(updatedExisting);
    }
  };

  const handleDeleteExistingFile = (index: number) => {
    const existing = existingFiles[index];
    if (existing) {
      setDeletedFiles((prev) => [...prev, existing]);
      const updatedExisting = [...existingFiles];
      updatedExisting[index] = null;
      setExistingFiles(updatedExisting);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력하세요.');
      return;
    }

    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const formData = new FormData();
      const data = {
        title,
        content,
        deleteFileUrls: deletedFiles,
      };

      formData.append(
        'data',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      );

      fileInputs.forEach((file) => {
        if (file) {
          formData.append('files', file);
        }
      });

      if (editMode && postId) {
        await axios.patch(
          `http://localhost:8080/community/post/${postId}/${userId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('게시글이 수정되었습니다.');
      } else {
        await axios.post(
          `http://localhost:8080/community/post/${userId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('게시글이 등록되었습니다.');
      }

      navigate('/community');
    } catch (err) {
      console.error('글 저장 실패', err);
      alert('글 저장 중 오류가 발생했습니다.');
    }
  };

  if (!userId) {
    return <div className="p-4 text-center text-red-500">로그인이 필요합니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">{editMode ? '게시글 수정' : '게시글 작성'}</h2>

      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded min-h-[200px]"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="space-y-2 text-sm text-gray-600">
        {[0, 1, 2].map((idx) => {
          const file = fileInputs[idx];
          const existing = existingFiles[idx];

          return (
            <div key={idx} className="flex flex-col gap-1">
              <input type="file" onChange={handleSingleFileChange(idx)} />

              {/* ✅ 기존 파일만 표시 (새 파일 이름은 브라우저 기본 UI로만 보여줌) */}
              {existing && !file && (
                <div className="flex items-center gap-2">
                  <a
                    href={existing}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline max-w-[250px] truncate"
                  >
                    {decodeURIComponent(existing.split('/').pop()!)}
                  </a>
                  <button
                    type="button"
                    className="text-red-500 text-xs underline"
                    onClick={() => handleDeleteExistingFile(idx)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default CommunityWrite;
