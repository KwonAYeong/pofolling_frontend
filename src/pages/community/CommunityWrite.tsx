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
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [file1Name, setFile1Name] = useState('');
  const [file2Name, setFile2Name] = useState('');
  const [file3Name, setFile3Name] = useState('');
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);

  const { user } = useUser();
  const userId = user?.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (editMode && postId && userId) {
        try {
          const res = await axios.get(`http://localhost:8080/community/post/${postId}/${userId}`);
          const data = res.data.data;
          setTitle(data.title);
          setContent(data.content);
          setExistingFiles(data.fileUrls || []);
        } catch (err) {
          console.error('게시글 불러오기 실패:', err);
        }
      }
    };

    fetchPost();
  }, [editMode, postId, userId]);

  useEffect(() => {
    if (editMode && existingFiles.length) {
      setFile1Name(existingFiles[0] ? decodeURIComponent(existingFiles[0].split('/').pop()!) : '');
      setFile2Name(existingFiles[1] ? decodeURIComponent(existingFiles[1].split('/').pop()!) : '');
      setFile3Name(existingFiles[2] ? decodeURIComponent(existingFiles[2].split('/').pop()!) : '');
    }
  }, [existingFiles]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0] || null;
    if (index === 1) {
      setFile1(file);
      setFile1Name(file?.name || '');
    }
    if (index === 2) {
      setFile2(file);
      setFile2Name(file?.name || '');
    }
    if (index === 3) {
      setFile3(file);
      setFile3Name(file?.name || '');
    }
  };

  const handleDeleteFile = (index: number) => {
    if (index === 1) {
      if (existingFiles[0]) setDeletedFiles(prev => [...prev, existingFiles[0]]);
      setFile1(null);
      setFile1Name('');
    }
    if (index === 2) {
      if (existingFiles[1]) setDeletedFiles(prev => [...prev, existingFiles[1]]);
      setFile2(null);
      setFile2Name('');
    }
    if (index === 3) {
      if (existingFiles[2]) setDeletedFiles(prev => [...prev, existingFiles[2]]);
      setFile3(null);
      setFile3Name('');
    }

    // 기존 파일도 제거 (UI에서)
    setExistingFiles(prev => {
      const copy = [...prev];
      copy[index - 1] = '';
      return copy;
    });
  };

  const handleSubmit = async () => {
    if (!userId) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file1) formData.append('files', file1);
    if (file2) formData.append('files', file2);
    if (file3) formData.append('files', file3);
    formData.append('deletedFiles', JSON.stringify(deletedFiles));

    try {
      if (editMode && postId) {
        await axios.put(
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
      console.error('글 등록/수정 실패:', err);
      alert('글 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">{editMode ? '게시글 수정' : '게시글 작성'}</h1>

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2 h-48 mb-4"
      />

      {/* 파일 선택 + 파일명 + 삭제 */}
      <div className="space-y-2 mb-6">
        {[1, 2, 3].map((num) => {
          const file = num === 1 ? file1 : num === 2 ? file2 : file3;
          const fileName = num === 1 ? file1Name : num === 2 ? file2Name : file3Name;

          return (
            <div key={num} className="flex items-center gap-3">
              <label className="bg-gray-100 px-3 py-1 rounded cursor-pointer text-sm text-gray-700 hover:bg-gray-200">
                파일 선택
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, num)} />
              </label>

              {fileName ? (
                <>
                  <span className="text-sm text-gray-600 max-w-[220px] truncate">{fileName}</span>
                  <button
                    onClick={() => handleDeleteFile(num)}
                    className="text-red-500 text-sm"
                  >
                    삭제
                  </button>
                </>
              ) : (
                <span className="text-sm text-gray-400">선택된 파일 없음</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default CommunityWrite;
