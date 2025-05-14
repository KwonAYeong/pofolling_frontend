interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="font-semibold">{post.title}</h3>
      <p className="text-sm text-gray-500">
        {post.author} · {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostCard;
