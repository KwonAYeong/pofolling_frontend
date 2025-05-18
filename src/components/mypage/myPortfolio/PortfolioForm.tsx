import React from 'react';

interface Props {
  title: string;
  content: string;
  fileName?: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
  submitLabel: string;
}

const PortfolioForm = ({
  title,
  content,
  fileName,
  onTitleChange,
  onContentChange,
  onFileChange,
  onSubmit,
  submitLabel,
}: Props) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 제목은 바깥에 */}
      <h2 className="text-2xl font-semibold">{submitLabel} 포트폴리오</h2>

      {/* 나머지는 박스 안에 */}
      <div className="p-6 bg-white rounded-2xl shadow space-y-6">
        {/* 제목 입력 */}
        <div>
          <label className="block font-medium mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="포트폴리오 제목을 입력하세요"
            className="w-full p-3 border rounded"
          />
        </div>

        {/* 내용 입력 */}
        <div>
          <label className="block font-medium mb-1">내용</label>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={6}
            className="w-full p-3 border rounded resize-none"
          />
        </div>

        {/* 파일 첨부 */}
        <div>
          <label className="block font-medium mb-1">포트폴리오 파일</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              onChange={(e) => onFileChange(e.target.files?.[0] || null)}
              className="flex-1"
            />
            {fileName && <span className="text-sm text-gray-500">{fileName}</span>}
          </div>
        </div>

        {/* 버튼 */}
        <div className="text-right">
          <button
            type="button"
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;
