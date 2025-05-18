import React from 'react';

interface PostCardProps {
  postId: number;
  title: string;
  preview: string;
  writer: string;
  writerProfileUrl: string;
  timeAgo: string;
  likeCount: number;
  viewCount: number;
  liked?: boolean;
  onLike: (postId: number) => void;
  likeDisabled?: boolean;
}

const PostCard = ({
  postId,
  title,
  preview,
  writer,
  writerProfileUrl,
  timeAgo,
  likeCount,
  viewCount,
  liked = false,
  onLike,
  likeDisabled = true,
}: PostCardProps) => {
  return (
    <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
      <h2 className="text-lg font-semibold truncate">{title}</h2>
      <p className="text-sm text-gray-700 mt-1 line-clamp-2">{preview}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
        <div className="flex items-center gap-2">
          <img
            src={writerProfileUrl}
            alt="작성자 프로필"
            className="w-5 h-5 rounded-full"
          />
          <span>{writer}</span>
          <span>· {timeAgo}</span>
        </div>

        <div className="flex items-center gap-3">
          <span>👁️ {viewCount}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!likeDisabled) onLike(postId);
            }}
            className={liked ? 'text-red-500' : 'text-gray-400'}
            disabled={likeDisabled}
          >
            ❤️ {likeCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
