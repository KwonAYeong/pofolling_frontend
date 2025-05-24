import React from 'react';

interface PostDetailProps {
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  profileImage?: string | null;
  fileUrls?: string[];
}

const PostDetail = ({
  title,
  content,
  nickname,
  createdAt,
  profileImage,
  fileUrls = [],
}: PostDetailProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {profileImage && (
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="w-6 h-6 rounded-full"
          />
        )}
        <span>{nickname}</span>
        <span>·</span>
        <span>{new Date(createdAt).toLocaleString('ko-KR')}</span>
      </div>

      <hr />

      <p className="whitespace-pre-wrap">{content}</p>

      {/* ✅ 첨부파일 처리 */}
      {fileUrls.length > 0 && (
        <div className="space-y-2">
          <p className="font-semibold text-gray-700">첨부파일:</p>
          {fileUrls.map((fileUrl, index) => {
            const fileName = fileUrl.split('/').pop() || '';
            const extension = fileName.split('.').pop()?.toLowerCase() || '';
            const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension);

            return (
              <div key={index}>
                {isImage ? (
                  <img
                    src={fileUrl}
                    alt={`첨부이미지-${index}`}
                    className="max-w-xs border rounded"
                  />
                ) : (
                  <a
                    href={fileUrl}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    {fileName} (다운로드)
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
