import React from 'react';

interface FileInputProps {
  label?: string;
  onFileChange: (file: File | null) => void;
  fileName?: string;
  accept?: string;
}

const FileInput = ({
  label = '파일 선택',
  onFileChange,
  fileName,
  accept = '.pdf,.doc,.docx',
}: FileInputProps) => {
  return (
    <div className="flex items-center gap-4">
      <label className="w-fit px-3 py-1.5 text-sm text-blue-700 font-semibold bg-blue-100 rounded cursor-pointer hover:bg-blue-200">
        {label}
        <input
          type="file"
          accept={accept}
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />
      </label>
      <span className="text-sm text-gray-700 truncate max-w-[200px]">
        {fileName || '선택된 파일 없음'}
      </span>
    </div>
  );
};

export default FileInput;
