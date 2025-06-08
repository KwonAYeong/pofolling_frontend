import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

interface Reply {
  replyId: number;
  userId: number;
  nickname: string;
  profileImage: string | null;
  content: string;
  updatedAt: string;
}

interface PostDetail {
  postId: number;
  userId: number;
  title: string;
  content: string;
  nickname: string;
  profileImage: string | null;
  createdAt: string;
  likeCount: number;
  viewCount: number;
  liked: boolean;
  fileUrls: string[];
  replies: Reply[];
}

const CommunityDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [loading, setLoading] = useState(true);

  const userId = user?.user_id;

  const fetchPost = async () => {
    if (!userId || !postId) return;

    try {
      const res = await axios.get(`http://localhost:8080/community/post/${postId}/${userId}`);
      setPost(res.data.data);
    } catch (err) {
      console.error('게시글 조회 실패', err);
      alert('게시글을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!userId || !postId) return;

    try {
      const res = await axios.post(`http://localhost:8080/community/post/${postId}/like/${userId}`);
      const { likeCount, liked } = res.data.data;
      setPost((prev) => prev ? { ...prev, likeCount, liked } : prev);
    } catch (err) {
      console.error('좋아요 실패', err);
      alert('좋아요 처리 중 오류 발생');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('정말 게시글을 삭제하시겠습니까?')) return;
    if (!userId || !postId) return;

    try {
      await axios.delete(`http://localhost:8080/community/post/${postId}/${userId}`);
      alert('삭제되었습니다.');
      navigate('/community');
    } catch (err) {
      console.error('삭제 실패', err);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    if (!userId || !postId) return;

    try {
      await axios.post(
        `http://localhost:8080/community/post/${postId}/reply?userId=${userId}`,
        { content: replyContent }
      );
      setReplyContent('');
      fetchPost();
    } catch (err) {
      alert('댓글 등록 실패');
    }
  };

  const handleReplyEdit = async (replyId: number) => {
    if (!userId) return;

    try {
      await axios.patch(
        `http://localhost:8080/community/post/reply/${replyId}?userId=${userId}`,
        { content: editingContent },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setEditingReplyId(null);
      setEditingContent('');
      fetchPost();
    } catch {
      alert('댓글 수정 실패');
    }
  };

  const handleReplyDelete = async (replyId: number) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    if (!userId) return;

    try {
      await axios.delete(`http://localhost:8080/community/post/reply/${replyId}?userId=${userId}`);
      fetchPost();
    } catch {
      alert('댓글 삭제 실패');
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId, userId]);

  if (!userId) {
    return <div className="p-4 text-center text-red-500">로그인이 필요합니다.</div>;
  }

  if (loading) {
    return <div className="p-4 text-center text-gray-500">로딩 중...</div>;
  }

  if (!post) {
    return <div className="p-4 text-center text-red-500">게시글을 불러올 수 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{post.title}</h1>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <img
          src={post.profileImage?.trim() ? post.profileImage : '/default-profile.png'}
          className="w-6 h-6 rounded-full"
        />
        <span>{post.nickname}</span>
        <span className="text-gray-400">· {new Date(post.createdAt).toLocaleString()}</span>
      </div>

      {userId === post.userId && (
        <div className="flex gap-2 justify-end text-sm">
          <button
            onClick={() => navigate(`/community/write?edit=true&id=${post.postId}`)}
            className="text-blue-600 hover:underline"
          >
            수정
          </button>
          <button
            onClick={handleDeletePost}
            className="text-red-600 hover:underline"
          >
            삭제
          </button>
        </div>
      )}

      <hr />

      <div className="whitespace-pre-wrap text-gray-800 text-base">{post.content}</div>

      {post.fileUrls?.length > 0 && (
        <div className="mt-4 space-y-2">
          {post.fileUrls.map((url, idx) => {
            const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
            const fileName = decodeURIComponent(url.split('/').pop() || `첨부파일-${idx + 1}`);
            return isImage ? (
              <img key={idx} src={url} alt={fileName} className="w-full rounded" />
            ) : (
              <div key={idx}>
                <a
                  href={url}
                  download
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📎 {fileName}
                </a>
              </div>
            );
          })}
        </div>
      )}

      <div className="text-sm text-gray-500 flex gap-4 border-t pt-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : 'text-gray-400'}`}
        >
          ❤️ 좋아요 {post.likeCount}
        </button>
        <span>👁️ 조회 {post.viewCount}</span>
      </div>

      <textarea
        className="w-full border rounded p-2 text-sm resize-none"
        rows={3}
        placeholder="댓글을 입력하세요"
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          onClick={handleReplySubmit}
          className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
        >
          등록
        </button>
      </div>

      <ul className="pt-6 space-y-4">
        {post.replies.map((reply) => (
          <li key={reply.replyId} className="border-b pb-3">
            <div className="flex gap-2 text-sm">
              <img
                src={post.profileImage?.trim() ? post.profileImage : '/default-profile.png'}
                className="w-=5 h-5 rounded-full"
              />
              <span className="font-medium">{reply.nickname}</span>
              <span className="text-gray-400">
                {new Date(reply.updatedAt).toLocaleString()}
              </span>
            </div>

            {editingReplyId === reply.replyId ? (
              <>
                <textarea
                  className="w-full border rounded p-2 mt-1 text-sm"
                  rows={2}
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-1 text-sm">
                  <button onClick={() => setEditingReplyId(null)}>취소</button>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleReplyEdit(reply.replyId)}
                  >
                    저장
                  </button>
                </div>
              </>
            ) : (
              <div className="ml-7 text-sm text-gray-800 whitespace-pre-wrap">
                {reply.content}
              </div>
            )}

            {reply.userId === userId && editingReplyId !== reply.replyId && (
              <div className="flex gap-2 justify-end mt-1 text-sm">
                <button
                  onClick={() => {
                    setEditingReplyId(reply.replyId);
                    setEditingContent(reply.content);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  수정
                </button>
                <button
                  onClick={() => handleReplyDelete(reply.replyId)}
                  className="text-red-600 hover:underline"
                >
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityDetail;
