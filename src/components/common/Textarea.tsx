
import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = ({ label, className = '', ...props }: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        className={`border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};
/* 사용예시
<Textarea
  label="자기소개"
  placeholder="간단한 소개를 입력하세요"
  rows={4}
  value={bio}
  onChange={(e) => setBio(e.target.value)}
/>
*/
export default Textarea;
