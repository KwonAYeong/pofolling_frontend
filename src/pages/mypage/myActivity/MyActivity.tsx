import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'api/axios';
import PostCard from 'components/community/PostCard';
import { useUser } from 'context/UserContext';

interface Post {
  postId: number;
  title: string;
  content: string;
  nickname: string;
  profileImage?: string;
  createdAt: string;
  likeCount: number;
  viewCount: number;
  liked?: boolean;
}

const MyActivity = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'written' | 'liked'>('written');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      const endpoint =
        activeTab === 'written'
          ? `/community/post/myPosts/${user.user_id}`
          : `/community/post/likedPosts/${user.user_id}`;

      try {
        const res = await axios.get(endpoint, {
          params: { page: 0, size: 20, sort: 'createdAt,desc' },
        });
        setPosts(res.data?.data?.content ?? []);
      } catch (err) {
        console.error('게시글 불러오기 실패:', err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [activeTab, user]);

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* 탭 */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab('written')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'written' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          내가 쓴 글
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'liked' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          좋아요 누른 글
        </button>
      </div>

      {/* 리스트 */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">게시글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.postId}
              onClick={() => navigate(`/community/${post.postId}`)}
            >
              <PostCard
                postId={post.postId}
                title={post.title}
                preview={post.content.slice(0, 100)}
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

export default MyActivity;
