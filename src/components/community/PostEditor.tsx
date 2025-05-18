import React from 'react';

interface PostEditorProps {
  title: string;
  content: string;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  onSubmit: () => void;
  isEditMode?: boolean; // 수정 모드 여부
}

const PostEditor = ({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onSubmit,
  isEditMode = false,
}: PostEditorProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">
        {isEditMode ? '글 수정하기' : '글 작성하기'}
      </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full px-4 py-2 border rounded text-lg"
      />

      <textarea
        value={content}
        onChange={(e) => onChangeContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="w-full h-64 px-4 py-2 border rounded resize-none"
      />

      <div className="text-right">
        <button
          onClick={() => {
            onSubmit();
            if (!isEditMode) {
              alert('글이 등록하였습니다.');
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {isEditMode ? '수정 완료' : '등록.'}
        </button>
      </div>
    </div>
  );
};

export default PostEditor;
