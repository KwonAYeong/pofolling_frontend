import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../components/community/PostCard';

interface Post {
  postId: number;
  title: string;
  content: string;
  nickname: string;
  profileImage: string | null;
  createdAt: string;
  likeCount: number;
  viewCount: number;
  liked?: boolean;
}

const CommunityList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/community/post');
        const content: Post[] = res.data.data.content;

        // ✅ 최신순 정렬 (최근 글이 위로)
        const sorted = content.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(sorted);
      } catch (err) {
        console.error('게시글 목록 가져오기 실패:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">커뮤니티</h1>
        <button
          onClick={() => navigate('/community/write')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ✏️ 글쓰기
        </button>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-gray-500 text-center">등록된 게시글이 없습니다.</div>
        ) : (
          posts.map((post) => (
            <div
              key={post.postId}
              onClick={() => navigate(`/community/${post.postId}`)}
            >
              <PostCard
                postId={post.postId}
                title={post.title}
                preview={post.content}
                writer={post.nickname}
                writerProfileUrl={post.profileImage ?? '/default-profile.png'}
                timeAgo={new Date(post.createdAt).toLocaleDateString()}
                likeCount={post.likeCount}
                viewCount={post.viewCount}
                liked={post.liked}
                onLike={() => {}}
                likeDisabled={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityList;
