import { useEffect, useState } from 'react';
import PostCard from 'components/community/PostCard';

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

const MyActivity = () => {
  const [activeTab, setActiveTab] = useState<'written' | 'liked'>('written');
  const [posts, setPosts] = useState<Post[]>([]); // 🔥 여기에 타입 명시

  useEffect(() => {
    if (activeTab === 'written') {
      setPosts([
        { id: 1, title: '내 글 제목', author: '나', createdAt: '2025-05-01' },
      ]);
    } else {
      setPosts([
        { id: 2, title: '좋아요한 글 제목', author: '감자', createdAt: '2025-05-02' },
      ]);
    }
  }, [activeTab]);

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
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

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MyActivity;
