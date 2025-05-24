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
  const [files, setFiles] = useState<FileList | null>(null);
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
          const post = res.data.data;
          setTitle(post.title);
          setContent(post.content);
          setExistingFiles(post.fileUrls || []);
        } catch (err) {
          console.error('수정할 게시글 불러오기 실패', err);
          alert('게시글을 불러올 수 없습니다.');
        }
      }
    };

    fetchPost();
  }, [editMode, postId, userId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleDeleteExistingFile = (fileUrl: string) => {
    setExistingFiles((prev) => prev.filter((url) => url !== fileUrl));
    setDeletedFiles((prev) => [...prev, fileUrl]);
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

      if (files) {
        Array.from(files).forEach((file) => {
          formData.append('files', file);
        });
      }

      if (editMode && postId) {
        const json = JSON.stringify({
          title,
          content,
          deleteFileUrls: deletedFiles,
        });
        const jsonBlob = new Blob([json], { type: 'application/json' });
        formData.append('data', jsonBlob);

        await axios.patch(
          `http://localhost:8080/community/post/${postId}/${userId}`,
          formData
        );
        alert('게시글이 수정되었습니다.');
      } else {
        formData.append('title', title);
        formData.append('content', content);

        await axios.post(`http://localhost:8080/community/post/${userId}`, formData);
        alert('게시글이 등록되었습니다.');
      }

      navigate('/community');
    } catch (err: any) {
      console.error('글 저장 실패', err.response || err.message || err);
      alert('글 저장 중 오류가 발생했습니다.');
    }
  };

  // ✅ URL에서 이미지 확장자 판별 함수
  const isImage = (url: string): boolean => {
    try {
      const decodedUrl = decodeURIComponent(url);
      return /\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(decodedUrl);
    } catch {
      return false;
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

      {/* 기존 파일 목록 */}
      {editMode && existingFiles.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm text-gray-700 font-semibold">기존 첨부파일:</p>
          {existingFiles.map((fileUrl) => {
            const fileName = decodeURIComponent(fileUrl.split('/').pop() || '');
            const isImageFile = isImage(fileUrl);

            return (
              <div
                key={fileUrl}
                className="flex items-center justify-between border px-3 py-2 rounded text-sm text-gray-700"
              >
                {isImageFile ? (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {fileName}
                  </a>
                ) : (
                  <a
                    href={fileUrl}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    {fileName} (다운로드)
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteExistingFile(fileUrl)}
                  className="text-red-500 hover:underline text-xs"
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      )}

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block text-sm text-gray-600"
      />

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
